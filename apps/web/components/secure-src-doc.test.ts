import { describe, expect, it } from "vitest";
import { secureSrcDoc } from "./secure-src-doc";

describe("secureSrcDoc", () => {
  it("在已有 <head> 的文档中注入 CSP meta", () => {
    const out = secureSrcDoc("<!doctype html><html><head><title>t</title></head><body><h1>hi</h1></body></html>");
    expect(out).toContain("Content-Security-Policy");
    expect(out).toContain("default-src 'none'");
    expect(out.indexOf("Content-Security-Policy")).toBeLessThan(out.indexOf("<title>"));
    expect(out).toContain("<h1>hi</h1>");
  });

  it("剥离 <base> 标签，防止基地址劫持", () => {
    const out = secureSrcDoc('<html><head><base href="https://evil.example/"></head><body>x</body></html>');
    expect(out.toLowerCase()).not.toContain("<base");
    expect(out).toContain("base-uri 'none'");
  });

  it("剥离 meta refresh，防止 iframe 内跳转逃逸", () => {
    const out = secureSrcDoc(
      '<html><head><meta http-equiv="refresh" content="0;url=https://evil.example/"></head><body>x</body></html>',
    );
    expect(out.toLowerCase()).not.toContain("refresh");
    expect(out).toContain("Content-Security-Policy");
  });

  it("兼容不带引号的 http-equiv=refresh 写法", () => {
    const out = secureSrcDoc("<html><head><meta http-equiv=refresh content=0></head><body>x</body></html>");
    expect(out.toLowerCase()).not.toContain("refresh");
  });

  it("缺少 <head> 的片段会被包进带 CSP 的完整文档", () => {
    const out = secureSrcDoc("<h1>fragment</h1>");
    expect(out.startsWith("<!doctype html>")).toBe(true);
    expect(out).toContain("Content-Security-Policy");
    expect(out).toContain("<body><h1>fragment</h1></body>");
  });

  it("空输入也产出带 CSP 的文档", () => {
    const out = secureSrcDoc("");
    expect(out).toContain("Content-Security-Policy");
    expect(out).toContain("connect-src 'none'");
  });
});
