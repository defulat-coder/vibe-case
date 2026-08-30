import { describe, expect, it } from "vitest";
import sourceConfig from "../../../content/skills/sources.json";
import { skillCategories, skills } from "./data";
import { discoveryConfigSchema } from "./schema";

describe("skills catalog invariants", () => {
  it("keeps each discovery run capped at 20 new skills", () => {
    expect(discoveryConfigSchema.parse(sourceConfig).maxNewPerRun).toBe(20);
  });

  it("keeps slugs, skill ids, and case ids unique", () => {
    // slug 冲突会让 generateStaticParams 产出重复路由，caseId 冲突会让运行接口找错案例
    expect(new Set(skills.map((item) => item.slug)).size).toBe(skills.length);
    expect(new Set(skills.map((item) => item.id)).size).toBe(skills.length);
    const caseIds = skills.flatMap((item) => item.cases.map((skillCase) => skillCase.id));
    expect(new Set(caseIds).size).toBe(caseIds.length);
  });

  it("keeps every case runnable: 20+ character prompts and bilingual content", () => {
    for (const item of skills) {
      expect(item.content.zhCN, `${item.id} zhCN content`).toBeTruthy();
      expect(item.content.sourceEN, `${item.id} EN content`).toBeTruthy();
      for (const skillCase of item.cases) {
        expect(skillCase.prompt.length, `${skillCase.id} prompt`).toBeGreaterThanOrEqual(20);
      }
    }
  });

  it("labels every category in use", () => {
    const labeled = new Set(skillCategories.map((category) => category.id));
    for (const item of skills) {
      expect(labeled.has(item.category), `${item.id} category ${item.category}`).toBe(true);
    }
  });
});
