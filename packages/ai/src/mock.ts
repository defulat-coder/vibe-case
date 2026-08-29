import type { GenerateUIInput, UIGenerationResult } from "./schemas";

const escapeHTML = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);

export function createMockResult(input: GenerateUIInput): UIGenerationResult {
  const title = escapeHTML(input.title);
  const summary = escapeHTML(input.summary);
  const brand = escapeHTML(input.variables.brand || "Northstar");

  return {
    title: input.title,
    summary: "演示模式：当前未配置 AI Gateway Key，展示合成的本地预览。",
    notes: ["配置 AI_GATEWAY_API_KEY 后将使用真实模型生成。", "Demo 仍遵循自包含 HTML 和 iframe 安全边界。"],
    html: `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f3f0e8;color:#111b32;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.shell{min-height:100vh;padding:24px}.nav{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #b9c0c9;padding:0 0 18px}.brand{font-size:18px;font-weight:800;letter-spacing:-.02em}.nav a{color:inherit;text-decoration:none;margin-left:22px;font-size:14px}.hero{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center;min-height:calc(100vh - 90px);max-width:1120px;margin:auto}.copy h1{font-family:Georgia,serif;font-size:clamp(48px,7vw,96px);line-height:.92;letter-spacing:-.04em;margin:0 0 28px}.copy p{max-width:58ch;font-size:18px;line-height:1.7;color:#495269}.actions{display:flex;gap:12px;margin-top:34px}.button{appearance:none;border:1px solid #111b32;background:#1747e8;color:white;padding:14px 20px;border-radius:10px;font-weight:750}.button.alt{background:transparent;color:#111b32}.specimen{background:#fff;border:1px solid #c6cad1;border-radius:16px;padding:18px;box-shadow:0 22px 50px -36px #111b32}.window{aspect-ratio:4/3;border-radius:10px;background:#0f1830;padding:20px;color:white;display:grid;align-content:space-between}.window small{color:#aab7d7}.metric{font:700 64px/1 Georgia,serif;color:#9dffbf}.rail{height:8px;border-radius:99px;background:#273455;overflow:hidden}.rail span{display:block;width:68%;height:100%;background:#9dffbf}@media(max-width:760px){.shell{padding:18px}.hero{grid-template-columns:1fr;gap:26px;padding:60px 0}.copy h1{font-size:54px}.specimen{order:-1}.nav nav{display:none}}
</style>
</head>
<body>
<main class="shell">
  <header class="nav"><div class="brand">${brand}</div><nav><a href="#">产品</a><a href="#">案例</a><a href="#">定价</a></nav></header>
  <section class="hero">
    <div class="copy"><h1>${title}</h1><p>${summary}</p><div class="actions"><button class="button">立即开始</button><button class="button alt">查看详情</button></div></div>
      <div class="specimen"><div class="window"><small>DEMO · 合成预览</small><div><div class="metric">HTML</div><p>此结果用于验证生成、保存与 iframe 预览链路。</p></div><div class="rail"><span></span></div></div></div>
  </section>
</main>
</body>
</html>`,
  };
}
