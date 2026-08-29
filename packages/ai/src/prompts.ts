import type { GenerateUIInput } from "./schemas";

export const uiInstructions = `你是一名资深 Web UI 设计师和前端工程师。
你的任务是根据案例结构生成一份完整、自包含、可响应式展示的 HTML 文档。

硬性要求：
- 只返回 Schema 要求的结构化结果。
- html 必须包含 <!doctype html>、<html>、<head> 和 <body>。
- CSS 全部写入内联 <style>，交互只使用内联 JavaScript。
- 不引用 CDN、外部字体、远程图片、npm 包、React 或构建工具。
- 使用语义化 HTML、可见焦点、足够对比度和移动端适配。
- 内容必须真实完整，不能使用 Lorem ipsum。
- 不使用 emoji 代替图标。
- 生成结果不能尝试访问父页面、Cookie、localStorage、摄像头或网络。
- 不解释如何创建项目，不返回文件路径或 Shell 命令。`;

export function buildUIPrompt(input: GenerateUIInput) {
  const variableText = Object.entries(input.variables)
    .filter(([, value]) => value.trim())
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");

  return `${input.prompt}

案例标题：${input.title}
案例说明：${input.summary}
${variableText ? `用户补充：\n${variableText}` : ""}

请把结构意图转换成有明确视觉观点的完整界面。HTML 必须在 1280×800 和 390×844 下都可用。`;
}
