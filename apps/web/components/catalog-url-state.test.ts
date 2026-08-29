import { describe, expect, it } from "vitest";
import { buildCatalogQuery } from "./catalog-url-state";

describe("buildCatalogQuery", () => {
  it("omits empty state so clean URLs stay shareable", () => {
    expect(buildCatalogQuery("", "All")).toBe("");
    expect(buildCatalogQuery("   ", "All")).toBe("");
  });

  it("encodes search and category, dropping the All sentinel", () => {
    expect(buildCatalogQuery("分屏", "All")).toBe(`q=${encodeURIComponent("分屏")}`);
    expect(buildCatalogQuery("", "marketing")).toBe("category=marketing");
    expect(buildCatalogQuery("分屏", "marketing")).toBe(`q=${encodeURIComponent("分屏")}&category=marketing`);
  });

  it("trims incidental whitespace around the query", () => {
    expect(buildCatalogQuery("  卡片  ", "All")).toBe(`q=${encodeURIComponent("卡片")}`);
  });
});
