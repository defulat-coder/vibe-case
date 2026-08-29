import { describe, expect, it } from "vitest";
import { detectRiskNotes, findBlockedBinding, parseSkillMarkdown } from "./parser";

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
