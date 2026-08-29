import { describe, expect, it } from "vitest";
import { detectRiskNotes, findBlockedBinding, parseSkillMarkdown, stripFrontmatter } from "./parser";
import { parsedSkillSchema } from "./schema";

describe("parseSkillMarkdown", () => {
  it("parses multiline metadata and workflow steps", () => {
    const parsed = parseSkillMarkdown(`---
name: poster-maker
description: |
  Turn a brief into a polished poster.
allowed-tools:
  - Read
  - Bash
---
# Poster Maker
## Workflow
1. Identify the audience
2. Pick a visual direction
3. Write the final prompt
`);

    expect(parsed).toMatchObject({
      name: "poster-maker",
      description: "Turn a brief into a polished poster.",
      allowedTools: ["Read", "Bash"],
      workflow: ["Identify the audience", "Pick a visual direction", "Write the final prompt"],
    });
  });

  it("marks executable instructions without executing them", () => {
    const markdown = `---\nname: unsafe\nallowed-tools: [Bash]\n---\nRun sudo rm -rf output`;
    expect(detectRiskNotes(markdown, parseSkillMarkdown(markdown))).toHaveLength(1);
  });

  it("blocks declared platform bindings before activation", () => {
    const markdown = `---\nname: vendor-image\ndescription: Generate images via RunComfy\nallowed-tools: [Bash]\n---\nLogin and run curl with API_KEY`;
    expect(findBlockedBinding(markdown, parseSkillMarkdown(markdown), ["runcomfy"])).toContain("runcomfy");
  });
});

describe("stripFrontmatter", () => {
  it("removes the frontmatter block and keeps the body", () => {
    const body = stripFrontmatter(`---\nname: poster-maker\ndescription: Make posters\n---\n# Poster Maker\n\nBody content.\n`);
    expect(body).toBe("# Poster Maker\n\nBody content.\n");
    expect(body).not.toContain("---");
  });

  it("returns the markdown unchanged when there is no frontmatter", () => {
    expect(stripFrontmatter("# Title\n\nBody.\n")).toBe("# Title\n\nBody.\n");
  });
});

describe("parsedSkillSchema content", () => {
  const baseSkill = {
    id: "poster-maker",
    slug: "poster-maker",
    status: "active" as const,
    category: "visual" as const,
    categoryLabel: "视觉设计",
    title: { zhCN: "海报生成", sourceEN: "Poster Maker", aliases: [] },
    summary: { zhCN: "生成海报", sourceEN: "Make posters" },
    whenToUse: ["需要海报时"],
    workflow: ["理解需求", "生成海报", "交付结果"],
    outputs: ["海报 Prompt"],
    dependencies: [],
    riskNotes: [],
    cases: [{
      id: "poster-maker-case-1",
      title: "案例 1",
      summary: "摘要",
      input: "输入",
      prompt: "Prompt",
      output: "输出",
      executionMode: "structured" as const,
    }],
    source: {
      repository: "example/skills",
      skillPath: "skills/poster-maker/SKILL.md",
      githubUrl: "https://github.com/example/skills",
      skillsShUrl: "https://skills.sh/example/skills/poster-maker",
      license: "MIT",
      commit: "abc123",
      installs: 0,
      contentHash: "hash",
    },
  };

  it("accepts entries with bilingual content", () => {
    const result = parsedSkillSchema.safeParse({
      ...baseSkill,
      content: { sourceEN: "# Poster Maker", zhCN: "# 海报生成" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects legacy entries without content", () => {
    expect(parsedSkillSchema.safeParse(baseSkill).success).toBe(false);
  });
});
