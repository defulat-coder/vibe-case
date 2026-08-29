import { describe, expect, it } from "vitest";
import { uiGenerationResultSchema } from "./schemas";

describe("uiGenerationResultSchema", () => {
  it("rejects tiny or oversized HTML", () => {
    expect(() => uiGenerationResultSchema.parse({ title: "x", summary: "x", html: "<p>x</p>", notes: [] })).toThrow();
  });
});
