# Vibe Case 调研与落地方案

> 调研日期：2026-08-29  
> 参考站点：[VibeUI](https://vibeui.online/) / [VibeUI About](https://vibeui.online/about) / [GlowUp UI](https://glowupui.io/)  
> 目标：不是复刻 VibeUI 的页面布局，而是建设一个可以持续扩展、可以实际运行案例的完整案例集。

## 1. 结论

产品应该定位为 **可运行、可复现的 AI 案例库**，暂用名 `Vibe Case`。

第一批内容是“前端 UI 生成案例”，未来可以继续增加：

- Skills 使用案例
- 浏览器自动化案例
- 数据处理与报表案例
- 文档、演示文稿、图片等产物案例
- 多步骤工作流和自动化案例

VibeUI 值得借鉴的是它的内容组织方式：把模糊的“做一个好看的 UI”拆成明确的结构案例。真正需要增强的部分是：每个案例不只提供一段可复制的提示词，而是带输入素材、生成配置、真实结果和复现信息，并由 Vercel AI SDK 直接生成结构化内容或自包含 HTML 效果。

### 1.1 已确定的技术栈

| 层级 | 选型 |
|---|---|
| 语言 | TypeScript，前后端和共享包统一使用 TS |
| 包管理 | pnpm workspace |
| Monorepo | Turborepo |
| Web | Next.js App Router + React |
| UI | Tailwind CSS + shadcn/ui，组件先放 `apps/web`，出现第二个消费者后再抽共享包 |
| AI | Vercel AI SDK v7，使用 `streamText` 和 `Output.object()` |
| 模型接入 | Vercel AI Gateway，具体模型由环境变量配置，不写死在案例中 |
| Schema | Zod |
| 运行数据 | Turso / libSQL + Drizzle ORM |
| 生成接口 | Next.js Route Handler，直接返回 AI SDK UI stream |
| 实时进度 | AI SDK streaming protocol |
| 结果存储 | Turso 保存线上生成记录，本地使用 libSQL 文件；图片按普通静态资源或对象存储处理 |
| 测试 | Vitest + Playwright |

选择 Monorepo 是为了让 Web、AI 生成逻辑、案例协议和数据访问保持清晰边界，同时为未来增加其他应用保留空间；首版仍然只有一个 Web 应用，不拆 Runner 或微服务。

## 2. 对参考产品的实测结论

### 2.1 VibeUI 的内容本质

VibeUI 是一个静态、结构化的提示词目录：

- 92 个唯一案例，15 个分类。
- 页面实际渲染了 184 个卡片实例：`All` 中完整展示一次，分类区又重复展示一次。
- 每条案例包含：短 ID、分类、标题、摘要、结构示意图、完整提示词、复制动作、生成跳转。
- 卡片没有使用真实效果图。实测文章卡片内有 368 个内联 SVG、0 个位图；也就是每个实例主要由轻量结构草图和图标组成。
- 提示词高度模板化：先明确组件或页面结构，再列必要内容，最后追加“匹配参考截图的视觉风格、颜色、字体和整体审美”。
- 搜索、分类滚动、深浅色和键盘快捷键只是浏览辅助，不是产品核心。

其 About 页面也明确说明：这些 prompt 描述的是 UI 的 **layout/structure**，视觉风格由用户上传的参考截图补充。

### 2.2 复制链路

点击 `Copy prompt` 后：

- 提示词会进入剪贴板。
- 卡片短暂显示 `Copied`。
- 页面会弹出一次 GlowUp UI 的推广引导，同时保留“只复制原始提示词”的退出路径。

实测还发现一个小差异：复制到剪贴板的后缀使用 `my existing UI`，生成跳转 URL 中的后缀使用 `the UI shown in my screenshot`。这说明提示词不是只能保存一条纯文本，而应该由可组合字段生成。

### 2.3 真实生成链路在 GlowUp UI

VibeUI 自身不执行生成。每条 `Generate in GlowUp` 链接会把完整 prompt 编码进查询参数并跳转到 GlowUp UI。

生成入口包含：

- 已预填的提示词，可继续编辑。
- 参考图片附件入口。
- Prompt Guide，内部复用了同一套 92 条结构模板。
- 1–6 个生成变体数量。
- 全部变体使用同一模型，或为每个变体单独选模型。
- 页面宣称最终结果是 live HTML preview，并可导出结构化设计规格，再交给代码生成工具实现。

这条链路可以抽象为：

`结构案例 → 用户变量/参考图 → 编译后的 prompt → 多个执行变体 → 可预览结果 → 可复现规格`

## 3. 产品定位

### 3.1 一句话定义

一个面向 AI 创作与开发的案例集：用户可以查看案例、理解输入和提示词、把案例运行到隔离项目中，并拿到经过验证的真实产物。

### 3.2 与 VibeUI 的核心差异

| 维度 | VibeUI | Vibe Case |
|---|---|---|
| 内容 | UI 结构 prompt | 多类型可运行案例 |
| 图片 | 结构示意图 | 封面、参考图、生成截图、对比图 |
| 执行 | 跳转第三方 | AI SDK 直接生成结构化结果 |
| 结果 | 复制 prompt | Prompt、HTML 预览、生成记录 |
| 扩展 | 固定 UI 分类 | Case Type + Output Schema 扩展 |
| 复现 | 用户自己粘贴 | 保存输入、模型、prompt 版本、消息/tool 历史和产物 |

### 3.3 产品原则

1. **案例优先**：首页展示“能做出什么”，不先展示工具能力。
2. **结果真实**：效果图来自实际生成结果，不能拿与代码无关的占位图充当成果。
3. **可复现**：每次生成记录 prompt、输入、模型、版本和结构化结果。
4. **无文件执行**：AI 不读写项目目录、不运行 Shell、不修改设计文件或代码文件。
5. **类型可扩展**：新增技能案例不需要改写 UI 案例的数据结构。
6. **中文优先、术语稳定**：面向用户的内容使用中文表达，但保留必要的英文专有名词，并通过术语表保证全站一致。

## 4. 信息架构

首版建议保留以下路由：

- `/`：案例集首页，展示集合、精选案例和最近运行。
- `/collections/[slug]`：一个案例集合，如“前端 UI”“技能案例”。
- `/cases/[slug]`：案例详情和可复现说明。
- `/cases/[slug]/run`：编辑变量、上传参考素材、选择执行配置。
- `/generations/[id]`：生成状态、HTML 预览和历史结果。

未来再增加：

- `/skills/[slug]`：技能说明与相关案例。
- `/workflows/[slug]`：多案例、多阶段的工作流。
- `/admin`：可视化内容管理；MVP 先不做。

## 5. 案例内容协议

每个案例用一个独立目录维护，内容和资源放在一起：

```text
content/cases/ui/pricing-three-tier/
  case.json
  prompt.md
  README.mdx
  assets/
    cover.png
    references/
    expected/
```

建议的数据模型：

```ts
type CaseDefinition = {
  schemaVersion: 1;
  id: string;
  slug: string;
  type: "ui-generation" | "skill-workflow" | "automation";
  collection: string;
  title: string;
  summary: string;
  status: "draft" | "published" | "archived";
  tags: string[];
  difficulty: "starter" | "intermediate" | "advanced";

  media: {
    cover: string;
    referenceImages?: string[];
    resultScreenshots: string[];
  };

  prompt: {
    templateFile: string;
    variables: Array<{
      key: string;
      label: string;
      type: "text" | "select" | "boolean" | "image";
      required: boolean;
      default?: unknown;
    }>;
    version: string;
  };

  generation: {
    kind: "ai-sdk";
    mode: "html-preview" | "structured-content" | "image";
    model?: string;
    outputSchema: string;
  };

  output: {
    kind: "html-preview" | "structured-content" | "image";
    acceptanceCriteria: string[];
  };
};
```

### 5.1 图片不要只有一个字段

图片至少要区分四种用途：

- `cover`：案例列表封面，优先使用真实生成结果。
- `referenceImages`：作为 AI 多模态输入的风格或内容参考图。
- `resultScreenshots`：已发布案例的结果截图，由内容维护者提供。
- `comparisonImages`：可选，展示参考与结果的并排对比。

首版 UI 案例应使用真实预览截图作为封面。类似 VibeUI 的结构草图可以作为辅助说明，但不应该代替最终效果。

### 5.2 Prompt 要拆成可组合层

不要只存一段最终字符串，建议拆为：

1. 案例意图：要解决什么任务。
2. 结构约束：布局、必要区域、交互状态。
3. 用户变量：文案、品牌、技术栈、响应式目标。
4. 参考素材：上传图片或静态资源 URL 及用途。
5. 输出契约：必须返回的 HTML 或结构化字段。
6. 展示约束：iframe 尺寸、响应式目标和交互要求。

这样同一案例可以支持“生成效果”“重新生成”和“只复制 prompt”三种模式。

### 5.3 中文化与专有名词规则

案例内容以简体中文为默认展示语言，但不做机械式全量翻译。品牌名、产品名、框架名、模型名、缩写和已经形成行业共识的 UI 模式名保留英文原文。

建议把双语信息作为结构化字段保存：

```ts
type LocalizedText = {
  zhCN: string;
  sourceEN?: string;
  aliases?: string[];
};

type CaseLocalization = {
  title: LocalizedText;
  summary: LocalizedText;
  prompt: LocalizedText;
};
```

前台默认显示 `zhCN`，详情页可以提供“查看英文原文”，搜索同时索引中文、英文和别名。这样既满足中文阅读，也方便用户拿英文术语继续搜索文档、组件和社区案例。

#### 保留英文的内容

- 品牌与产品：`Codex`、`GlowUp UI`、`VibeUI`、`OpenAI`。
- 框架与库：`Next.js`、`React`、`Tailwind CSS`、`shadcn/ui`。
- 模型和 SDK：`Vercel AI SDK`、`AI Gateway`、具体模型名称。
- 缩写：`UI`、`UX`、`CTA`、`API`、`SSE`、`SDK`、`HTML`、`JSON`。
- 常用模式名：`Bento`、`Hero`、`Dashboard`、`Kanban`、`Magic Link`、`Sidebar`、`Modal`、`Toast`、`Dark Mode`。

#### 翻译方式

- 普通描述完整翻译为自然中文，不保留英文语序。
- 专有名词嵌入中文句子，例如：`Bento 网格`、`Hero 区域`、`Dashboard 仪表盘`、`Magic Link 登录`。
- 首次出现且可能难懂的缩写可以补一次中文解释，例如：`CTA（行动按钮）`；后续只使用 `CTA`。
- 代码标识、文件名、命令、路由和配置字段保持原样，不翻译。
- 同一个术语只能有一个首选译法，禁止在不同案例中混用“仪表板/仪表盘”“模态框/弹窗”等多个版本。

#### 示例

英文标题：

```text
Classic 3-tier cards
```

中文标题：

```text
经典三档 Pricing 方案卡片
```

英文 prompt：

```text
Create a pricing section with three side-by-side tier cards...
```

中文 prompt：

```text
创建一个 Pricing 区域，使用三张并排的方案卡片（Starter、Pro、Business），
将中间方案突出显示为推荐选项。包含方案名称、价格、功能列表和 CTA，
并匹配参考图中的视觉风格、颜色、字体排版和整体审美。
```

这里保留 `Pricing`、`Starter`、`Pro`、`Business` 和 `CTA`，而把 `tier cards`、`Typography` 等普通描述翻译成自然中文。正式写作时由术语表决定保留范围，而不是逐条自由选择。

#### 首版术语表

术语表建议维护在 `content/glossary.json`，至少包含：

| 英文术语 | 中文展示 | 处理规则 |
|---|---|---|
| UI | UI | 始终保留 |
| UX | UX | 始终保留 |
| CTA | CTA | 首次可补“行动按钮” |
| Hero | Hero 区域 | 保留英文 |
| Bento grid | Bento 网格 | 保留 Bento |
| Dashboard | Dashboard 仪表盘 | 保留英文并补中文 |
| Kanban board | Kanban 看板 | 保留英文 |
| Magic Link | Magic Link 登录 | 保留英文 |
| Modal | 弹窗 | 中文优先，英文作为搜索别名 |
| Toast | Toast 提示 | 保留英文 |
| Dark Mode | Dark Mode | 保留英文 |
| Prompt | Prompt / 提示词 | 页面标题可用 Prompt，正文可用“提示词” |
| AI SDK | AI SDK | 指 Vercel AI SDK，始终保留 |
| AI Gateway | AI Gateway | 产品名称，始终保留 |
| streamText | streamText | API 名称，始终保留 |

术语表不仅用于文案审核，也用于搜索别名、批量翻译检查和未来的多语言扩展。

## 6. Vercel AI SDK 落地方式

AI 层只使用 Vercel AI SDK，不构建文件系统 Agent，也不引入 `ToolLoopAgent`、custom tools、Shell、workspace、构建进程或设计文件操作。

首版只需要两种 AI SDK 能力：

- `streamText`：流式生成解释、Prompt 和结果内容。
- `Output.object()`：用 Zod 校验最终结构。

模型默认通过 Vercel AI Gateway 接入，具体 model ID 由环境变量配置，案例内容不绑定模型。

### 6.1 UI 案例输出

UI 案例直接返回一份结构化结果：

```ts
type UIGenerationResult = {
  title: string;
  summary: string;
  html: string;
  notes: string[];
};
```

其中 `html` 是自包含的单页 HTML：

- CSS 写在 `<style>` 中。
- 需要交互时只使用内联 JavaScript。
- 不依赖 npm、构建工具或外部项目文件。
- 不返回 React 工程、组件目录或可执行命令。
- 前端通过 `<iframe sandbox="allow-scripts">` 的 `srcDoc` 展示效果。
- iframe 不使用 `allow-same-origin`，并注入 CSP 禁止网络请求和父页面访问。

### 6.2 推荐生成流程

```text
用户打开案例
  → 修改 Prompt 变量
  → 可选上传参考图片
  → Route Handler 校验输入
  → AI SDK streamText + Output.object()
  → 流式返回生成状态
  → 校验结构化结果与 HTML 大小
  → 保存 generation 记录
  → sandboxed iframe 展示效果
```

### 6.3 状态机

```text
idle
  → generating
  → validating
  → ready

任一阶段可以进入 failed 或 cancelled
```

### 6.4 明确废弃的能力

以下内容不进入当前产品，也不预留抽象：

- 读取、创建、修改或删除项目文件。
- `applyPatch`、Shell、命令执行和依赖安装。
- 临时 Git 仓库与 workspace。
- 独立 Runner、任务队列和子进程。
- 自动构建、启动开发服务器和端口代理。
- 自动操作 Figma、Sketch、PSD 等设计文件。
- 自动生成项目截图和代码 diff。

如果以后明确需要“把结果写进真实项目”，应作为新的产品能力重新评估，不在本阶段留空接口。

## 7. TypeScript Monorepo 架构

### 7.1 目录结构

```text
vibe-case/
  apps/
    web/                 # Next.js 案例站、生成页、Route Handlers、iframe 预览
  packages/
    ai/                  # AI SDK 调用、Prompt 编译和输出 Schema
    cases/               # CaseDefinition、术语表、内容加载和搜索索引
    db/                  # Drizzle schema、libSQL client、generation repository
  content/
    cases/
    glossary.json
  package.json
  pnpm-workspace.yaml
  turbo.json
  tsconfig.json
```

暂不创建 `packages/ui`、`packages/types` 和 `packages/config`：首版只有 `apps/web` 消费 UI；类型跟随 `ai`、`cases`、`db` 的所有者存放；共享配置先留在根目录。出现第二个真实消费者时再抽包。

### 7.2 apps/web

- Next.js App Router，使用 Node.js runtime。
- Server Components 读取案例目录和生成历史。
- Route Handler 直接调用 `packages/ai` 并返回 AI SDK stream。
- 客户端负责变量表单、参考图上传、流式状态和 iframe 预览。
- 案例内容来自仓库内 `content/`，构建时由 `packages/cases` 用 Zod 校验。
- 搜索索引在构建时从案例元数据生成，MVP 不引入搜索服务。

### 7.3 packages/ai

- 封装 AI Gateway model、system prompt、`streamText` 和 `Output.object()`。
- 保存 UI、文本、图片等不同输出 Schema。
- 接收案例定义、变量和参考图片，返回类型安全的 generation result。
- 不依赖文件系统、Shell、浏览器自动化或数据库。

### 7.4 packages/cases

- 保存 `CaseDefinition`、双语字段、术语表和 Prompt 编译器。
- 输出 Web 与 AI 生成层共用的只读案例对象。
- 负责中英文与 aliases 搜索索引。
- 不依赖 Next.js、数据库或 AI SDK。

### 7.5 packages/db

- Turso / libSQL + Drizzle ORM。
- 首版表：`generations` 和可选的 `generation_messages`。
- 记录案例 ID、输入、模型、状态、结果、耗时和 token usage。
- 案例正文仍由 Git 管理，不写入数据库。

### 7.6 Turborepo 任务

根任务保持最小：

```text
dev        # 启动 web
build      # 依赖包先检查，再构建 web
typecheck  # 全仓 TS 检查
test       # 单元与集成测试
lint       # 静态检查
```

远程缓存、复杂 CI matrix 和 microfrontends 首版都不启用。

### 7.7 预览

- 直接把生成结果的 `html` 写入 iframe `srcDoc`。
- iframe 使用 sandbox 与 CSP，不能读取父页面、Cookie 或本地存储。
- 不启动预览服务器，不生成本地文件，不执行构建命令。

## 8. 技能案例如何接入

技能不是另一套产品，而是另一种 `case.type` 和执行配置。

例如一个“使用某个 Skill 完成 PDF 报告”的案例仍然包含：

- 案例说明与最终效果图
- 输入说明和变量
- 使用的技能 ID、版本和前置条件
- 提示词模板
- AI SDK 生成配置
- 预期输出说明和示例图片

首版的 Skill 案例是可阅读、可复制、可让 AI SDK 辅助生成内容的案例，不在站点内真正安装或执行 Skill。

未来可以按输出模式扩展：

- `html-preview`：生成自包含 HTML 并在 iframe 展示。
- `structured-content`：生成报告、步骤或结构化 JSON。
- `image`：通过 AI SDK 的图片能力生成图片。

这些模式共用同一个案例详情、生成记录和结果展示框架。

## 9. MVP 范围

### 必须做

1. 案例集合、分类、搜索和详情页。
2. 12–20 个原创 UI 案例，覆盖 Hero、Pricing、Auth、Dashboard 等高频结构。
3. 案例的真实封面、参考图、prompt、变量和验收标准。
4. 中文案例内容、英文原文和统一术语表。
5. 中英文与别名搜索。
6. AI SDK `streamText` 与 `Output.object()`。
7. 参考图片多模态输入。
8. 流式生成、取消和错误处理。
9. 自包含 HTML 的 sandboxed iframe 预览。
10. 生成历史和重新生成。

### 首版不做

- 多用户登录、计费和套餐。
- 项目目录、GitHub 仓库和代码文件操作。
- 可视化案例编辑后台。
- 同时调用多个厂商模型做竞赛。
- 一开始就搬运 92 条内容。
- 复杂推荐系统和向量搜索。

### 第二阶段

- 技能案例类型。
- 一个案例多变体并行运行。
- 图片生成模式。
- 参考图与结果的视觉相似度评分。
- 多用户账号和对象存储。

## 10. 建议的实施顺序

### Phase 0：项目骨架与协议

- 初始化 pnpm + Turborepo + TypeScript Monorepo。
- 创建 `apps/web`、`packages/ai`、`packages/cases`、`packages/db`。
- 初始化 Next.js Web 项目和基础设计系统。
- 建立 `CaseDefinition`、Zod 校验和内容目录。
- 做 3 个不执行的示例案例，验证浏览体验。

### Phase 1：单案例闭环

- 接入 Vercel AI SDK、AI Gateway、`streamText` 和 `Output.object()`。
- 定义 `UIGenerationResult` Schema 和 iframe 安全策略。
- 固定一个 UI 案例和一份自包含 HTML 输出模板。
- 完成从 Prompt 到自包含 HTML 预览的全链路。

### Phase 2：案例库产品化

- 扩充至 12–20 个原创 UI 案例。
- 增加搜索、筛选、变量表单、运行历史。
- 统一真实效果图和结果页。

### Phase 3：技能案例

- 增加 `skill-workflow` 类型、Skill 元数据和专用 Prompt 模板。
- 选择 2–3 个代表性技能案例验证协议是否真的通用。

### Phase 4：多人使用

- 仅在需要公开给多人使用时增加账号、限流和对象存储。

## 11. 验收标准

首个可用版本应同时满足：

- 新增一个案例只需增加案例目录和资源，不改页面代码。
- 用户可以看到真实结果、参考图、完整 prompt 和输入要求。
- 案例默认显示自然中文，英文专有名词符合术语表，且可以查看英文原文。
- 使用中文、英文或术语别名都能搜索到同一案例。
- 点击生成后可以看到流式状态，而不是一直等待。
- AI 层不存在项目文件、Shell 或 workspace 权限。
- 至少一个带参考图的 UI 案例能生成自包含 HTML 效果。
- 生成 HTML 通过 Schema、大小和基础安全校验后才能进入 iframe。
- iframe 无法读取父页面、Cookie 或本地存储，也不能发起网络请求。
- 失败可以定位到输入校验、模型生成、结果校验或保存阶段。
- 同一个案例可以保留历史结果并重新生成。
- 新增技能案例不需要更换数据库结构或重写详情页。

## 12. 风险与边界

### 内容与版权

VibeUI 页面和 About 页没有展示明确的内容复用许可证。正式站点不建议原样搬运 92 条英文 prompt、内联 SVG 或 GlowUp 的营销素材。

推荐做法：

- 借鉴“结构案例”的分类方法。
- 用中文重新编写原创 prompt。
- 使用自己实际生成并验证过的结果截图。
- 如确实要原样导入 VibeUI 内容，先取得明确授权并保留来源信息。

### 安全

- 系统完全不提供 Shell、文件系统或项目目录能力。
- 用户 prompt、参考图片和模型输出都视为不可信输入。
- API key 只存在于服务端 Route Handler。
- 限制输入大小、图片大小、模型超时、并发和输出 HTML 大小。
- HTML 只能在 sandboxed iframe 中显示，不能直接注入站点 DOM。

### 产品边界

AI SDK 是模型生成与流式传输层。前端 UI 案例的运行时产物是 **自包含 HTML 预览**，不是项目代码、设计源文件或 Git diff。已发布案例仍然可以配置人工筛选过的封面和结果截图；如果未来需要纯图片生成，直接增加 AI SDK 的 `image` 输出模式。

## 13. 本轮调研截图

1. `01-home-viewport.png`：VibeUI 首页和案例目录。
2. `02-search-bento.png`：搜索 `bento` 后的单结果状态。
3. `03-category-pricing.png`：Pricing 分类与结构草图卡片。
4. `04-copy-feedback.png`：复制后的反馈和推广弹窗。
5. `05-dark-mode.png`：深色主题。
6. `06-glowup-generation-entry.png`：预填 prompt、参考图、变体数量和生成入口。
7. `07-glowup-model-settings.png`：按变体配置模型。
8. `08-glowup-prompt-guide.png`：Prompt Guide 内复用结构案例库。
9. `09-about.png`：VibeUI 对“结构 prompt + 参考截图”的官方说明。

## 14. 最终建议

下一轮不要从“把 92 条内容做进页面”开始，而应先完成一个纵向样板：

1. 一个原创 Pricing UI 案例。
2. 一张参考图。
3. 一份结构化 prompt 模板。
4. AI SDK 返回经过 Schema 校验的自包含 HTML。
5. sandboxed iframe 直接展示效果。
6. 在案例详情页保存生成结果与复现信息。

这个样板跑通后，案例数量只是内容生产问题；如果先做大目录，生成与复现协议没定，后面加入技能案例时会重新建模。
