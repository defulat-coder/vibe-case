import { describe, expect, it } from "vitest";
import { cases, getCaseById } from "@vibe-case/cases";
import { caseMatchesQuery } from "./catalog-search";

function pricingCase() {
  const item = cases.find((candidate) => candidate.category === "Pricing");
  if (!item) throw new Error("no Pricing case in catalog");
  return item;
}

describe("caseMatchesQuery", () => {
  it("空查询匹配全部", () => {
    expect(caseMatchesQuery(pricingCase(), "")).toBe(true);
    expect(caseMatchesQuery(pricingCase(), "   ")).toBe(true);
  });

  it("整词中文同义词召回对应英文分类", () => {
    const item = pricingCase();
    expect(item.categoryLabel).toBe("Pricing");
    expect(caseMatchesQuery(item, "定价")).toBe(true);
    expect(caseMatchesQuery(item, "价格")).toBe(true);
    expect(caseMatchesQuery(item, "页脚")).toBe(false);
  });

  it("分类展示标签参与匹配", () => {
    const authCase = cases.find((candidate) => candidate.category === "Auth Forms");
    expect(authCase && caseMatchesQuery(authCase, "表单")).toBe(true);
    expect(authCase && caseMatchesQuery(authCase, "Auth")).toBe(true);
  });

  it("英文分类 id 参与匹配", () => {
    expect(caseMatchesQuery(pricingCase(), "pricing")).toBe(true);
  });

  it("标题、摘要与标签仍然参与匹配", () => {
    const item = getCaseById("auth-3");
    expect(item && caseMatchesQuery(item, item.title.zhCN)).toBe(true);
    expect(item && caseMatchesQuery(item, "不存在的词xyz")).toBe(false);
  });
});
