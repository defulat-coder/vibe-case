import { describe, expect, it } from "vitest";
import {
  generateUIInputSchema,
  runSkillCaseInputSchema,
  skillCaseResultSchema,
  uiGenerationResultSchema,
} from "./schemas";

const validGenerateInput = {
  generationId: "gen-1",
  caseId: "auth-1",
  title: "标题",
  summary: "摘要",
  prompt: "这是一段长度达标的生成提示词文本，用于通过校验",
  variables: {},
};

describe("uiGenerationResultSchema", () => {
  it("rejects tiny or oversized HTML", () => {
    expect(() => uiGenerationResultSchema.parse({ title: "x", summary: "x", html: "<p>x</p>", notes: [] })).toThrow();
    expect(() => uiGenerationResultSchema.parse({ title: "x", summary: "x", html: `<p>${"x".repeat(120_000)}</p>`, notes: [] })).toThrow();
  });
});

describe("generateUIInputSchema", () => {
  it("enforces the prompt length window", () => {
    expect(() => generateUIInputSchema.parse({ ...validGenerateInput, prompt: "太短" })).toThrow();
    expect(() => generateUIInputSchema.parse({ ...validGenerateInput, prompt: "长".repeat(8_001) })).toThrow();
    expect(generateUIInputSchema.parse(validGenerateInput).prompt).toBe(validGenerateInput.prompt);
  });

  it("defaults variables and caps each value at 500 characters", () => {
    const withoutVariables: Record<string, unknown> = { ...validGenerateInput };
    delete withoutVariables.variables;
    expect(generateUIInputSchema.parse(withoutVariables).variables).toEqual({});
    expect(() => generateUIInputSchema.parse({ ...validGenerateInput, variables: { brand: "x".repeat(501) } })).toThrow();
  });

  it("only accepts data-URL reference images", () => {
    expect(() => generateUIInputSchema.parse({ ...validGenerateInput, referenceImage: "https://evil.example/x.png" })).toThrow();
    expect(generateUIInputSchema.parse({ ...validGenerateInput, referenceImage: "data:image/png;base64,AAAA" }).referenceImage).toBe("data:image/png;base64,AAAA");
  });
});

describe("runSkillCaseInputSchema", () => {
  it("requires a case id and a 20+ character prompt", () => {
    expect(() => runSkillCaseInputSchema.parse({ caseId: "", prompt: "这是一段长度达标的运行提示词文本，用于通过校验" })).toThrow();
    expect(() => runSkillCaseInputSchema.parse({ caseId: "case-1", prompt: "太短" })).toThrow();
    expect(runSkillCaseInputSchema.parse({ caseId: "case-1", prompt: "这是一段长度达标的运行提示词文本，用于通过校验" }).caseId).toBe("case-1");
  });
});

describe("skillCaseResultSchema", () => {
  it("discriminates image and text results with their own rules", () => {
    expect(skillCaseResultSchema.parse({ kind: "text", text: "结果" })).toEqual({ kind: "text", text: "结果" });
    expect(() => skillCaseResultSchema.parse({ kind: "text", text: "" })).toThrow();
    expect(() => skillCaseResultSchema.parse({ kind: "image", image: "https://evil.example/x.png", mediaType: "image/png" })).toThrow();
    expect(skillCaseResultSchema.parse({ kind: "image", image: "data:image/png;base64,AAAA", mediaType: "image/png" }).kind).toBe("image");
    expect(() => skillCaseResultSchema.parse({ kind: "other", text: "x" })).toThrow();
  });
});
