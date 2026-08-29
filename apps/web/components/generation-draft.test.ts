import { describe, expect, it } from "vitest";
import { parseGenerationDraft, readGenerationDraft, writeGenerationDraft } from "./generation-draft";

describe("parseGenerationDraft", () => {
  it("restores valid drafts and rejects malformed storage", () => {
    expect(parseGenerationDraft(JSON.stringify({ version: 1, prompt: "保留我的 Prompt", variables: { brand: "Vibe Case" } })))
      .toEqual({ version: 1, prompt: "保留我的 Prompt", variables: { brand: "Vibe Case" } });
    expect(parseGenerationDraft("not json")).toBeUndefined();
    expect(parseGenerationDraft(JSON.stringify({ version: 2, prompt: "旧版本", variables: {} }))).toBeUndefined();
  });

  it("keeps cases isolated and tolerates unavailable storage", () => {
    const values = new Map<string, string>();
    const storage = () => ({
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => { values.set(key, value); },
    });
    expect(writeGenerationDraft(storage, "case-a", { version: 1, prompt: "案例 A", variables: {} })).toBe(true);
    expect(writeGenerationDraft(storage, "case-b", { version: 1, prompt: "案例 B", variables: {} })).toBe(true);
    expect(readGenerationDraft(storage, "case-a").draft?.prompt).toBe("案例 A");
    expect(readGenerationDraft(storage, "case-b").draft?.prompt).toBe("案例 B");

    const unavailable = () => { throw new DOMException("Blocked", "SecurityError"); };
    expect(readGenerationDraft(unavailable, "case-a").available).toBe(false);
    expect(writeGenerationDraft(unavailable, "case-a", { version: 1, prompt: "不会崩溃", variables: {} })).toBe(false);
    expect(writeGenerationDraft(storage, "too-long", { version: 1, prompt: "x".repeat(8_001), variables: {} })).toBe(false);
  });
});
