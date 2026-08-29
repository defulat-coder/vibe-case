type FrontmatterValue = string | string[];

export type SkillMarkdown = {
  name: string;
  description: string;
  license?: string;
  allowedTools: string[];
  headings: string[];
  workflow: string[];
};

function unquote(value: string) {
  return value.trim().replace(/^['"]|['"]$/g, "");
}

function parseFrontmatter(block: string) {
  const result: Record<string, FrontmatterValue> = {};
  const lines = block.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index]?.match(/^([\w-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;

    if (rawValue === "|" || rawValue === ">") {
      const values: string[] = [];
      while (lines[index + 1]?.match(/^\s+/)) values.push(lines[++index]!.trim());
      result[key] = values.join(" ");
      continue;
    }

    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      result[key] = rawValue.slice(1, -1).split(",").map(unquote).filter(Boolean);
      continue;
    }

    if (!rawValue && lines[index + 1]?.trim().startsWith("- ")) {
      const values: string[] = [];
      while (lines[index + 1]?.trim().startsWith("- ")) values.push(unquote(lines[++index]!.trim().slice(2)));
      result[key] = values;
      continue;
    }

    result[key] = unquote(rawValue);
  }

  return result;
}

function cleanListItem(value: string) {
  return value
    .replace(/^[-*+]\s+/, "")
    .replace(/^\d+[.)]\s+/, "")
    .replace(/^\*\*(.+?)\**:?\s*/, "$1：")
    .trim();
}

export function stripFrontmatter(markdown: string) {
  const frontmatterMatch = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  return frontmatterMatch ? markdown.slice(frontmatterMatch[0].length) : markdown;
}

export function parseSkillMarkdown(markdown: string): SkillMarkdown {
  const frontmatterMatch = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  const frontmatter = parseFrontmatter(frontmatterMatch?.[1] ?? "");
  const body = stripFrontmatter(markdown);
  const headings = [...body.matchAll(/^#{1,3}\s+(.+)$/gm)].map((match) => match[1]!.trim());
  const workflowHeading = headings.find((heading) => /workflow|instructions|process|步骤|流程/i.test(heading));
  const workflow: string[] = [];

  if (workflowHeading) {
    const lines = body.split(/\r?\n/);
    const start = lines.findIndex((line) => line.replace(/^#{1,3}\s+/, "").trim() === workflowHeading);
    for (const line of lines.slice(start + 1)) {
      if (/^#{1,3}\s+/.test(line)) break;
      if (/^\s*(?:[-*+]\s+|\d+[.)]\s+)/.test(line)) {
        const item = cleanListItem(line);
        if (item) workflow.push(item);
      }
    }
  }

  const allowed = frontmatter["allowed-tools"];
  return {
    name: String(frontmatter.name || headings[0] || "Untitled skill"),
    description: String(frontmatter.description || ""),
    license: frontmatter.license ? String(frontmatter.license) : undefined,
    allowedTools: Array.isArray(allowed) ? allowed : allowed ? [String(allowed)] : [],
    headings,
    workflow,
  };
}

export function detectRiskNotes(markdown: string, parsed: SkillMarkdown) {
  const notes: string[] = [];
  if (/\b(?:bash|shell|exec|rm\s+-rf|sudo)\b/i.test(markdown) || parsed.allowedTools.some((tool) => /bash|shell/i.test(tool))) {
    notes.push("原 Skill 包含 Shell 或命令执行说明；站内仅解析内容，不执行原始命令。");
  }
  if (/API[_ -]?KEY|login|sign[ -]?in|credits|付费|登录/i.test(markdown)) {
    notes.push("原 Skill 可能涉及账号、密钥或付费服务；站内案例不会继承这些依赖。");
  }
  return notes;
}

export function findBlockedBinding(markdown: string, parsed: SkillMarkdown, excludedTerms: string[]) {
  const declaredSurface = `${parsed.description} ${parsed.allowedTools.join(" ")}`.toLowerCase();
  const term = excludedTerms.find((candidate) => declaredSurface.includes(candidate.toLowerCase()));
  if (term) return `声明依赖被排除的产品或平台：${term}`;
  const executable = parsed.allowedTools.some((tool) => /bash|shell/i.test(tool));
  if (executable && /api[_ -]?key|login|sign[ -]?in|credits|curl\s|npm\s+install|pip\s+install|付费|登录/i.test(markdown)) {
    return "包含需要账号、密钥、付费额度或安装命令的可执行依赖";
  }
}
