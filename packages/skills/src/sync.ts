import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateText, Output } from "ai";
import { z } from "zod";
import { detectRiskNotes, findBlockedBinding, parseSkillMarkdown, stripFrontmatter } from "./parser.ts";
import {
  discoveryConfigSchema,
  parsedSkillSchema,
  skillCategorySchema,
  skillExecutionModeSchema,
  type ParsedSkill,
  type SkillSourceConfig,
} from "./schema.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const sourcesPath = resolve(root, "content/skills/sources.json");
const catalogPath = resolve(root, "content/skills/catalog.json");
const errorsPath = resolve(root, "content/skills/sync-errors.json");
const discover = process.argv.includes("--discover");

const categoryLabels = {
  image: "图片生成",
  visual: "视觉设计",
  ui: "UI 设计",
  ux: "UX 研究",
  product: "Product Design",
  motion: "Motion Design",
  video: "视频创作",
} as const;

const enrichmentSchema = z.object({
  titleZhCN: z.string().min(1),
  summaryZhCN: z.string().min(1),
  contentZhCN: z.string().min(1),
  category: skillCategorySchema,
  aliases: z.array(z.string()).max(6),
  whenToUse: z.array(z.string()).min(2).max(5),
  workflow: z.array(z.string()).min(3).max(7),
  outputs: z.array(z.string()).min(2).max(5),
  dependencies: z.array(z.string()).max(6),
  cases: z.array(z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    input: z.string().min(1),
    prompt: z.string().min(1),
    output: z.string().min(1),
    executionMode: skillExecutionModeSchema,
  })).min(2).max(2),
});

type SearchSkill = { id: string; skillId: string; name: string; installs: number; source: string };
type RepoMetadata = { license?: { spdx_id?: string }; default_branch: string; html_url: string };

// 旧版 catalog 条目可能缺少 content 字段，读取时放宽，同步时强制回填
const storedSkillSchema = parsedSkillSchema.extend({
  content: parsedSkillSchema.shape.content.optional(),
});
type StoredSkill = z.infer<typeof storedSkillSchema>;

function headers() {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "vibe-case-skills-sync",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  };
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json() as Promise<T>;
}

async function fetchText(url: string, init?: RequestInit) {
  const response = await fetch(url, init);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.text();
}

async function searchSkills(query: string) {
  const result = await fetchJson<{ skills: SearchSkill[] }>(`https://skills.sh/api/search?q=${encodeURIComponent(query)}&limit=12`);
  return result.skills;
}

function isExcluded(skill: SearchSkill, config: z.infer<typeof discoveryConfigSchema>) {
  const owner = skill.source.split("/")[0]!.toLowerCase();
  if (config.excludedOwners.map((item) => item.toLowerCase()).includes(owner)) return true;
  const haystack = `${skill.id} ${skill.name} ${skill.source}`.toLowerCase();
  return config.excludedTerms.some((term) => haystack.includes(term.toLowerCase()));
}

async function githubTree(repository: string) {
  const result = await fetchJson<{ tree: Array<{ path: string; type: string }> }>(
    `https://api.github.com/repos/${repository}/git/trees/HEAD?recursive=1`,
    { headers: headers() },
  );
  return result.tree.filter((item) => item.type === "blob" && /SKILL\.md$/i.test(item.path)).map((item) => item.path);
}

async function rawSkill(repository: string, skillPath: string) {
  const encodedPath = skillPath.split("/").map(encodeURIComponent).join("/");
  return fetchText(`https://raw.githubusercontent.com/${repository}/HEAD/${encodedPath}`);
}

async function resolveSkillPath(repository: string, skillId: string) {
  const paths = await githubTree(repository);
  const preferred = paths.sort((left, right) => Number(!left.toLowerCase().includes(skillId.toLowerCase())) - Number(!right.toLowerCase().includes(skillId.toLowerCase())));
  for (const skillPath of preferred.slice(0, 20)) {
    const markdown = await rawSkill(repository, skillPath);
    if (parseSkillMarkdown(markdown).name.toLowerCase() === skillId.toLowerCase()) return skillPath;
  }
  throw new Error(`Could not resolve ${repository}@${skillId}`);
}

function caseSlug(skillId: string, title: string, index: number) {
  const normalized = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${skillId}-${normalized || index + 1}`;
}

async function enrich(markdown: string, parsed: ReturnType<typeof parseSkillMarkdown>) {
  const body = stripFrontmatter(markdown).trim().slice(0, 18_000);
  if (!process.env.AI_GATEWAY_API_KEY) {
    return enrichmentSchema.parse({
      titleZhCN: parsed.name,
      summaryZhCN: `这个 Skill 用于：${parsed.description}`,
      contentZhCN: body,
      category: "visual",
      aliases: parsed.headings.slice(0, 4),
      whenToUse: ["需要应用这个 Skill 的方法时", "希望把方法转换为可复用案例时"],
      workflow: parsed.workflow.slice(0, 7).length >= 3 ? parsed.workflow.slice(0, 7) : ["理解用户目标", "按 Skill 方法完成任务", "检查并交付结果"],
      outputs: ["结构化方法说明", "可复制的案例 Prompt"],
      dependencies: parsed.allowedTools,
      cases: [0, 1].map((index) => ({
        title: `${parsed.name} 案例 ${index + 1}`,
        summary: "使用原 Skill 的核心工作流解决一个具体问题。",
        input: "描述你的目标、对象和限制条件。",
        prompt: `请使用 ${parsed.name} 的方法完成这个任务，并展示关键步骤与最终结果。`,
        output: "结构化结果与下一步建议",
        executionMode: "structured" as const,
      })),
    });
  }

  const { output } = await generateText({
    model: process.env.SKILLS_AI_MODEL ?? "openai/gpt-5.6-luna",
    output: Output.object({ schema: enrichmentSchema }),
    instructions: "你负责把开源 SKILL.md 解析成中文案例库数据。使用自然中文，保留 GPT Image 2、Prompt、UI、UX、Motion Design、BPM、FPS 等专有名词。删除厂商宣传、登录、付费和原始 Shell 执行步骤。不要编造来源没有表达的能力。contentZhCN 是 SKILL.md 正文（不含 frontmatter）的完整中文翻译：保留原有 Markdown 结构（标题、列表、代码块），品牌、产品、框架、模型和缩写等专有名词保留英文。",
    prompt: `解析以下 SKILL.md，contentZhCN 翻译其正文，并生成两个个人用户可以理解和运行的案例。图片类使用 image，视频节奏使用 timeline-plan，其余优先 structured。\n\n${markdown.slice(0, 18_000)}`,
  });
  return output;
}

async function syncSource(source: SkillSourceConfig, excludedTerms: string[], existing?: StoredSkill, installs?: number) {
  const [markdown, repo] = await Promise.all([
    rawSkill(source.repository, source.skillPath),
    fetchJson<RepoMetadata>(`https://api.github.com/repos/${source.repository}`, { headers: headers() }),
  ]);
  const parsed = parseSkillMarkdown(markdown);
  if (!parsed.name || !parsed.description) throw new Error(`Invalid frontmatter in ${source.repository}/${source.skillPath}`);
  const blocked = findBlockedBinding(markdown, parsed, excludedTerms);
  if (blocked) throw new Error(blocked);
  const hash = createHash("sha256").update(markdown).digest("hex");
  const commits = await fetchJson<Array<{ sha: string }>>(
    `https://api.github.com/repos/${source.repository}/commits?path=${encodeURIComponent(source.skillPath)}&per_page=1`,
    { headers: headers() },
  );
  const sourceData = {
    repository: source.repository,
    skillPath: source.skillPath,
    githubUrl: repo.html_url,
    skillsShUrl: source.skillsShUrl,
    license: repo.license?.spdx_id && repo.license.spdx_id !== "NOASSERTION" ? repo.license.spdx_id : parsed.license ?? "Unknown",
    commit: commits[0]?.sha ?? "",
    installs: installs ?? existing?.source.installs ?? 0,
    contentHash: hash,
  };

  if (sourceData.license === "Unknown") throw new Error("Missing a recognized source license");

  if (existing && existing.content && (!existing.source.contentHash || existing.source.contentHash === hash)) {
    return parsedSkillSchema.parse({
      ...existing,
      summary: { ...existing.summary, sourceEN: parsed.description },
      riskNotes: [...new Set([...existing.riskNotes, ...detectRiskNotes(markdown, parsed)])],
      source: sourceData,
    });
  }

  if (existing && !process.env.AI_GATEWAY_API_KEY) {
    throw new Error("SKILL.md changed or content missing but AI_GATEWAY_API_KEY is unavailable for Chinese re-enrichment");
  }

  const normalized = await enrich(markdown, parsed);
  return parsedSkillSchema.parse({
    id: source.skillId,
    slug: source.skillId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    status: "active",
    category: normalized.category,
    categoryLabel: categoryLabels[normalized.category],
    title: { zhCN: normalized.titleZhCN, sourceEN: parsed.name, aliases: normalized.aliases },
    summary: { zhCN: normalized.summaryZhCN, sourceEN: parsed.description },
    content: { sourceEN: stripFrontmatter(markdown).trim().slice(0, 18_000), zhCN: normalized.contentZhCN },
    whenToUse: normalized.whenToUse,
    workflow: normalized.workflow,
    outputs: normalized.outputs,
    dependencies: normalized.dependencies,
    riskNotes: detectRiskNotes(markdown, parsed),
    cases: normalized.cases.map((item, index) => ({ ...item, id: caseSlug(source.skillId, item.title, index) })),
    source: sourceData,
  });
}

async function main() {
  const config = discoveryConfigSchema.parse(JSON.parse(await readFile(sourcesPath, "utf8")));
  const current = storedSkillSchema.array().parse(JSON.parse(await readFile(catalogPath, "utf8")));
  const sourceKey = (source: SkillSourceConfig) => `${source.repository}/${source.skillId}`.toLowerCase();
  // 被门禁拦截过的来源永久排除，避免每轮重复报错
  const excludedSources = new Set(config.excludedSources.map((key) => key.toLowerCase()));
  const sources = config.sources.filter((source) => !excludedSources.has(sourceKey(source)));
  const installCounts = new Map<string, number>();

  if (discover) {
    const found = (await Promise.all(config.queries.map(searchSkills))).flat();
    const known = new Set(sources.map((source) => sourceKey(source)));
    let added = 0;
    for (const skill of found) {
      const key = `${skill.source}/${skill.skillId}`.toLowerCase();
      installCounts.set(key, skill.installs);
      if (known.has(key) || excludedSources.has(key) || isExcluded(skill, config) || added >= config.maxNewPerRun) continue;
      // 同名 Skill 以先收录的来源为准，避免跨仓库 skillId 冲突
      if (sources.some((source) => source.skillId.toLowerCase() === skill.skillId.toLowerCase())) continue;
      try {
        const skillPath = await resolveSkillPath(skill.source, skill.skillId);
        sources.push({
          repository: skill.source,
          skillId: skill.skillId,
          skillPath,
          skillsShUrl: `https://skills.sh/${skill.source}/${skill.skillId}`,
        });
        known.add(key);
        added += 1;
      } catch (error) {
        console.warn(error instanceof Error ? error.message : String(error));
      }
    }
  }

  const errors: Array<{ source: string; message: string }> = [];
  const next: ParsedSkill[] = [];
  const blockedKeys = new Set<string>();
  for (const source of sources) {
    const existing = current.find((skill) => skill.id === source.skillId);
    const owner = source.repository.split("/")[0]!.toLowerCase();
    try {
      if (config.excludedOwners.some((candidate) => candidate.toLowerCase() === owner)) throw new Error(`Excluded repository owner: ${owner}`);
      next.push(await syncSource(source, config.excludedTerms, existing, installCounts.get(sourceKey(source))));
      console.log(`active ${source.repository}@${source.skillId}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push({ source: `${source.repository}@${source.skillId}`, message });
      if (/^(?:声明依赖被排除的产品或平台|包含需要账号、密钥、付费额度或安装命令的可执行依赖|Missing a recognized source license)/.test(message)) {
        blockedKeys.add(sourceKey(source));
      }
      if (existing && !next.some((skill) => skill.id === existing.id)) {
        const parsedExisting = parsedSkillSchema.safeParse(existing);
        if (parsedExisting.success) next.push(parsedExisting.data);
      }
      console.warn(`sync_error ${source.repository}@${source.skillId}: ${message}`);
    }
  }

  for (const key of blockedKeys) excludedSources.add(key);
  const keptSources = sources.filter((source) => !blockedKeys.has(sourceKey(source)));

  await writeFile(catalogPath, `${JSON.stringify(next, null, 2)}\n`);
  await writeFile(sourcesPath, `${JSON.stringify({ ...config, excludedSources: [...excludedSources].sort(), sources: keptSources }, null, 2)}\n`);
  await writeFile(errorsPath, `${JSON.stringify(errors, null, 2)}\n`);
}

await main();
