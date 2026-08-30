import { afterEach, describe, expect, it, vi } from "vitest";
import { copyText } from "./copy-to-clipboard";

afterEach(() => vi.unstubAllGlobals());

function stubFallback(execResult: boolean) {
  const textarea = {
    value: "",
    tabIndex: 0,
    style: {} as Record<string, string>,
    setAttribute: vi.fn(),
    select: vi.fn(),
    remove: vi.fn(),
  };
  vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } });
  vi.stubGlobal("document", {
    createElement: vi.fn(() => textarea),
    body: { appendChild: vi.fn() },
    execCommand: vi.fn(() => execResult),
  });
  return textarea;
}

describe("copyText", () => {
  it("falls back to a hidden textarea when Clipboard API is unavailable", async () => {
    const textarea = stubFallback(true);

    await expect(copyText("中文 Prompt")).resolves.toBe(true);
    expect(textarea.value).toBe("中文 Prompt");
    expect(textarea.remove).toHaveBeenCalledOnce();
  });

  it("returns false when both copy paths fail", async () => {
    const textarea = stubFallback(false);

    await expect(copyText("Prompt")).resolves.toBe(false);
    expect(textarea.remove).toHaveBeenCalledOnce();
  });
});
