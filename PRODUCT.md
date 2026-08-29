# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

TypeScript、pnpm workspace、Turborepo、Next.js App Router、React、Tailwind CSS、shadcn/ui、Vercel AI SDK v7、Vercel AI Gateway、Zod、Turso / libSQL、Drizzle ORM、Vitest、Playwright。

## Users

主要用户是使用 AI 辅助开发和创作的中文用户。他们希望从真实案例出发，快速理解一个 Prompt 能生成什么，并能直接查看、复制、调整和运行案例。

## Product Purpose

Vibe Case 是一个中文优先、可浏览、可生成、可复现的 AI 案例集。首个集合完整覆盖 VibeUI 的 15 个前端 UI 分类和 92 个案例内容，后续可增加 Skill、自动化、数据分析、文档和图片案例。

成功意味着用户能从案例发现进入详情，查看中英文 Prompt，选择参考图，通过 AI SDK 生成自包含 HTML，并在站内安全预览和重新生成。

## Positioning

产品不是 Prompt 文章目录，也不是代码 Agent。它把案例内容、双语术语、参考素材、结构化生成和安全结果预览放进一个闭环，帮助中文用户从“看案例”直接走到“看到生成效果”。

## Operating Context

- 用户以桌面浏览为主，也需要移动端浏览案例。
- 案例内容由 Git 管理，生成记录在线上保存到 Turso，本地使用 libSQL 文件。
- 用户可以搜索、筛选、复制中英文 Prompt，并上传一张临时参考图。
- AI 通过 Vercel AI SDK 和 AI Gateway 调用。
- AI 结果是自包含 HTML 或结构化内容，不写入项目目录。

## Capabilities and Constraints

- 首版包含 15 个分类和 92 个 UI 案例。
- 默认显示自然中文，同时保留英文原文和专有名词。
- 搜索覆盖中文、英文、别名和标签。
- UI 生成使用 `streamText` 与 `Output.object()`。
- HTML 只在 sandboxed iframe 中显示。
- 不使用 Codex SDK、`ToolLoopAgent`、文件 tools、Shell、Runner、workspace 或设计文件操作。
- 不复刻 VibeUI 的页面布局、品牌或营销素材。

## Brand Commitments

- 产品名：Vibe Case。
- 中文优先，英文专有名词保留。
- 语气清晰、直接、实用，不使用夸大营销文案。
- 界面以案例本身为主角，工具控件退居其次。
- `high-quality-100/` 中的 100 张黑白手绘人物头像是辅助识别系统：其粗黑线稿、马卡龙背景和友善气质负责品牌辨识，但不得占据案例结构、Prompt 或生成结果的主要可视区域。

## Evidence on Hand

- `IMPLEMENTATION_GOAL.md`：当前主实现与验收基线。
- `research/vibeui-audit/implementation-plan.md`：调研与补充方案。
- `research/vibeui-audit/*.png`：VibeUI 与 GlowUp UI 调研截图。
- `high-quality-100/*.png`：用户确认喜爱的头像视觉参考，共 100 张。
- 已确认 VibeUI 当前包含 15 个分类和 92 个唯一案例。
- 当前没有自有 Logo、品牌图片、客户证明或商业指标，不得编造。

## Product Principles

1. 案例先于工具：用户先理解结果，再决定是否生成。
2. 中文自然、术语稳定：中文可读性与英文可检索性同时保留。
3. 结果可见：生成必须落到站内可预览的结构化结果。
4. 最小安全边界：模型输出永远不直接进入站点 DOM，也不获得文件或 Shell 权限。
5. 内容可扩展：新增案例通过数据和 Schema 完成，不修改页面结构。

## Accessibility & Inclusion

- 支持键盘操作、可见焦点、语义化标题和表单标签。
- 正文与控件满足基本对比度要求。
- 移动端保持可读和可操作。
- 缩略图和结果图提供描述性 alt 文本。
