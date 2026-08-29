import { describe, expect, it } from "vitest";
import { cases, categories, searchCases } from "./data";

describe("UI case catalog", () => {
  it("contains 15 categories and 92 unique cases", () => {
    expect(categories).toHaveLength(15);
    expect(cases).toHaveLength(92);
    expect(new Set(cases.map((item) => item.id)).size).toBe(92);
    expect(new Set(cases.map((item) => item.slug)).size).toBe(92);
  });

  it("matches the expected category counts", () => {
    for (const category of categories) {
      expect(cases.filter((item) => item.category === category.id)).toHaveLength(category.count);
    }
  });

  it("searches Chinese, English, and aliases", () => {
    expect(searchCases("Bento").some((item) => item.id === "ft-2")).toBe(true);
    expect(searchCases("看板").some((item) => item.id === "ds-4")).toBe(true);
    expect(searchCases("Magic Link").some((item) => item.id === "auth-5")).toBe(true);
  });

  it("keeps every case submittable: non-empty slug and 20+ character prompts", () => {
    // 生成接口要求 prompt 至少 20 字符，否则该案例的生成按钮会永久禁用
    for (const item of cases) {
      expect(item.slug, `${item.id} slug`).toBeTruthy();
      expect(item.prompt.zhCN.length, `${item.id} zhCN prompt`).toBeGreaterThanOrEqual(20);
      expect(item.prompt.sourceEN.length, `${item.id} EN prompt`).toBeGreaterThanOrEqual(20);
    }
  });
});
