# Vibe Case 调研与落地方案

> 调研日期：2026-08-29  
> 参考站点：[VibeUI](https://vibeui.online/) / [VibeUI About](https://vibeui.online/about) / [GlowUp UI](https://glowupui.io/)  
> 目标：不是复刻 VibeUI 的页面布局，而是建设一个可以持续扩展、可以实际运行案例的完整案例集。

## 1. 结论

产品应该定位为 **可运行、可复现的 AI 案例库**，暂用名 `Vibe Case`。

第一批内容是“前端 UI 生成案例”，未来可以继续增加：

- Codex 技能使用案例
- 浏览器自动化案例
- 数据处理与报表案例
- 文档、演示文稿、图片等产物案例
- 多步骤工作流和自动化案例

VibeUI 值得借鉴的是它的内容组织方式：把模糊的“做一个好看的 UI”拆成明确的结构案例。真正需要增强的部分是：每个案例不只提供一段可复制的提示词，而是带输入素材、执行配置、生成过程、真实结果和验证信息，可以直接在隔离工作区中由 Codex SDK 运行。

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
| 执行 | 跳转第三方 | Codex SDK 在隔离工作区执行 |
| 结果 | 复制 prompt | 代码、预览、截图、日志、验证结果 |
| 扩展 | 固定 UI 分类 | Case Type + Runner 插件化扩展 |
| 复现 | 用户自己粘贴 | 保存输入、模型、prompt 版本、线程和产物 |

### 3.3 产品原则

1. **案例优先**：首页展示“能做出什么”，不先展示工具能力。
2. **结果真实**：效果图来自实际生成结果，不能拿与代码无关的占位图充当成果。
3. **可复现**：每次运行记录 prompt、输入、Codex 线程、模型和版本。
4. **执行隔离**：Codex 只能修改本次运行工作区，不能直接修改案例库或站点源码。
5. **类型可扩展**：新增技能案例不需要改写 UI 案例的数据结构。
6. **中文优先、术语稳定**：面向用户的内容使用中文表达，但保留必要的英文专有名词，并通过术语表保证全站一致。

## 4. 信息架构

首版建议保留以下路由：

- `/`：案例集首页，展示集合、精选案例和最近运行。
- `/collections/[slug]`：一个案例集合，如“前端 UI”“技能案例”。
- `/cases/[slug]`：案例详情和可复现说明。
- `/cases/[slug]/run`：编辑变量、上传参考素材、选择执行配置。
- `/runs/[id]`：实时过程、预览、截图、日志和产物下载。

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

  runner: {
    kind: "codex";
    starter?: string;
    skills?: Array<{ id: string; version?: string; required: boolean }>;
    model?: string;
    reasoningEffort?: string;
    networkAccess: boolean;
    maxDurationSeconds: number;
  };

  output: {
    kind: "web-preview" | "file" | "report" | "mixed";
    expectedFiles?: string[];
    startCommand?: string;
    healthPath?: string;
  };

  verification: {
    commands: string[];
    browserChecks?: string[];
    acceptanceCriteria: string[];
  };
};
```

### 5.1 图片不要只有一个字段

图片至少要区分四种用途：

- `cover`：案例列表封面，优先使用真实生成结果。
- `referenceImages`：作为 Codex 输入的风格或内容参考图。
- `resultScreenshots`：实际运行后的输出截图。
- `comparisonImages`：可选，展示参考与结果的并排对比。

首版 UI 案例应使用真实预览截图作为封面。类似 VibeUI 的结构草图可以作为辅助说明，但不应该代替最终效果。

### 5.2 Prompt 要拆成可组合层

不要只存一段最终字符串，建议拆为：

1. 案例意图：要解决什么任务。
2. 结构约束：布局、必要区域、交互状态。
3. 用户变量：文案、品牌、技术栈、响应式目标。
4. 参考素材：本地图片路径与用途。
5. 项目约束：必须复用的组件、依赖和设计系统。
6. 输出契约：必须生成哪些文件和结构化结果。
7. 验证契约：构建、浏览器检查和截图要求。

这样同一案例可以支持“从零生成”“基于现有项目改造”和“只复制 prompt”三种模式。

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
- 模型和 SDK：`Codex SDK`、`GPT-5.6 Sol`。
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
经典三档 Pricing 卡片
```

英文 prompt：

```text
Create a pricing section with three side-by-side tier cards...
```

中文 prompt：

```text
创建一个 Pricing 区域，使用三张并排的 tier cards（Starter、Pro、Business），
将中间方案突出显示为推荐选项。包含方案名称、价格、功能列表和 CTA，
并匹配参考图中的视觉风格、颜色、Typography 和整体审美。
```

正式写作时应由术语表决定哪些英文词保留。上面的 `Typography` 如果最终术语表决定使用“字体排版”，全站就统一使用“字体排版”，而不是逐条自由选择。

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
| Runner | Runner / 执行器 | 技术配置保留 Runner，用户说明使用“执行器” |

术语表不仅用于文案审核，也用于搜索别名、批量翻译检查和未来的多语言扩展。

## 6. Codex SDK 落地方式

官方 Codex SDK 的 TypeScript 库用于在服务端启动、继续和恢复本地 Codex 线程，要求 Node.js 18+。当前 SDK 也支持：

- `workingDirectory`：让每个线程只在对应运行目录工作。
- `sandboxMode`：首版固定使用 `workspace-write`。
- `approvalPolicy`：无人值守运行使用 `never`，同时配合严格沙箱。
- `local_image` 输入：把案例参考图作为真实的本地图片输入。
- `runStreamed()`：将执行事件转换为前端实时进度。
- `outputSchema`：要求最终返回结构化运行摘要。
- `resumeThread()`：在失败修复或用户继续追问时复用同一线程。

当前目录还不是 Git 仓库。生成工作区可以初始化为临时 Git 仓库，或者显式允许 SDK 跳过仓库检查；正式实现时更推荐初始化临时 Git 仓库，方便保存 diff 和回滚。

### 6.1 推荐执行流程

```text
用户点击运行
  → 校验案例与输入
  → 创建 runs/<runId>/workspace
  → 复制 starter 与参考素材
  → 编译最终 prompt
  → 启动 Codex thread
  → 流式记录事件
  → 构建与测试
  → 启动本地预览
  → 浏览器验证与截图
  → 保存 result.json、截图、日志和线程 ID
  → 展示预览或失败原因
```

### 6.2 运行状态机

```text
queued
  → preparing
  → generating
  → building
  → verifying
  → preview_ready

任一阶段可进入 failed 或 cancelled
```

不要把“Codex 返回了文字”视为成功。UI 案例只有在构建通过、预览可访问、关键页面完成浏览器检查并产出截图后，状态才能进入 `preview_ready`。

### 6.3 一次运行的目录边界

```text
.vibe-case/
  runs/
    <runId>/
      input/
      workspace/
      artifacts/
        screenshots/
        result.json
        events.ndjson
        build.log
```

Codex 的 `workingDirectory` 指向 `workspace/`。站点源码、案例内容目录、用户主目录和密钥文件都不向线程开放。

### 6.4 Prompt 编译后的输出契约

每个 Codex 线程结束时应返回结构化结果：

```json
{
  "status": "completed",
  "summary": "",
  "changedFiles": [],
  "startCommand": "",
  "previewPath": "/",
  "checks": [],
  "knownLimitations": []
}
```

结构化结果用于编排，不替代真实的文件检查、构建日志和浏览器验证。

## 7. 技术架构建议

当前项目为空，建议从 TypeScript/Node 单体开始：

### 7.1 Web 层

- Next.js App Router，用于案例目录、详情页、运行页和 API。
- 案例内容来自仓库内的 `content/`，构建时用 Zod 校验。
- 封面与参考图片作为本地静态资产管理。
- 搜索索引从案例元数据静态生成；首版不需要外部搜索服务。

### 7.2 Runner 层

- 独立的 Node worker 模块封装 `@openai/codex-sdk`。
- Web 层不直接持有长任务；API 创建 run，worker 执行。
- 单机 MVP 可以使用进程内队列，并限制为一次只跑一个任务。
- 前端通过 SSE 接收状态和事件。

### 7.3 存储

- 案例定义：Git 管理的 JSON/MDX/图片。
- 运行元数据：MVP 使用 SQLite。
- 大文件和截图：MVP 放 `.vibe-case/runs`，后续云版迁移对象存储。

### 7.4 预览

- 每个成功运行分配独立端口并建立受控代理路径，例如 `/preview/<runId>/`。
- 预览进程只能访问该 run 的工作区。
- 运行结束或超时后回收进程；截图和构建产物继续保留。

## 8. 技能案例如何接入

技能不是另一套产品，而是另一种 `case.type` 和执行配置。

例如一个“用某技能生成 PDF 报告”的案例仍然包含：

- 案例说明与最终效果图
- 输入文件和变量
- 使用的技能 ID、版本和前置条件
- 提示词模板
- Codex 运行器
- 输出文件和验证规则

Runner 在启动前检查技能是否可用。缺失时返回明确的 `missing_dependency`，而不是让 Codex 在运行中随机失败。

未来可以按 Runner 扩展：

- `codex-web`：生成和验证网页。
- `codex-skill`：调用指定技能生成文件或执行工作流。
- `codex-analysis`：输出报告或结构化数据。

这些 Runner 共用同一个案例详情、运行记录和产物展示框架。

## 9. MVP 范围

### 必须做

1. 案例集合、分类、搜索和详情页。
2. 12–20 个原创 UI 案例，覆盖 Hero、Pricing、Auth、Dashboard 等高频结构。
3. 案例的真实封面、参考图、prompt、变量和验收标准。
4. 中文案例内容、英文原文和统一术语表。
5. 中英文与别名搜索。
6. Codex SDK 隔离运行。
7. 本地图片输入。
8. 流式状态、日志和取消。
9. 构建、预览、截图和浏览器验证。
10. 运行历史与同线程修复重试。

### 首版不做

- 多用户登录、计费和套餐。
- 公共云沙箱与 GitHub PR。
- 可视化案例编辑后台。
- 同时调用多个厂商模型做竞赛。
- 一开始就搬运 92 条内容。
- 复杂推荐系统和向量搜索。

### 第二阶段

- 技能案例类型。
- 一个案例多变体并行运行。
- 参考图与结果的自动对比评分。
- GitHub 仓库导入、分支和 PR。
- 云端隔离容器、队列和对象存储。

## 10. 建议的实施顺序

### Phase 0：项目骨架与协议

- 初始化 Web 项目和基础设计系统。
- 建立 `CaseDefinition`、Zod 校验和内容目录。
- 做 3 个不执行的示例案例，验证浏览体验。

### Phase 1：单案例闭环

- 接入 Codex SDK。
- 固定一个 UI 案例和一个 starter。
- 完成从运行到预览、截图、验证的全链路。

### Phase 2：案例库产品化

- 扩充至 12–20 个原创 UI 案例。
- 增加搜索、筛选、变量表单、运行历史。
- 统一真实效果图和结果页。

### Phase 3：技能案例

- 增加 `skill-workflow` 类型和依赖检查。
- 选择 2–3 个代表性技能案例验证协议是否真的通用。

### Phase 4：云化

- 仅在需要公开给多人运行时增加账号、GitHub、容器、队列和对象存储。

## 11. 验收标准

首个可用版本应同时满足：

- 新增一个案例只需增加案例目录和资源，不改页面代码。
- 用户可以看到真实结果、参考图、完整 prompt 和输入要求。
- 案例默认显示自然中文，英文专有名词符合术语表，且可以查看英文原文。
- 使用中文、英文或术语别名都能搜索到同一案例。
- 点击运行后能看到阶段化进度，而不是一直等待。
- Codex 只能写入本次 run 的工作区。
- 至少一个带参考图的 UI 案例能生成可运行页面。
- 页面构建通过，浏览器无关键控制台错误。
- 系统自动生成结果截图和运行摘要。
- 失败可以定位到准备、生成、构建或验证阶段。
- 同一个 run 可以通过线程 ID 继续修复。
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

- 禁止默认使用 `danger-full-access`。
- 用户 prompt、图片和项目文件都视为不可信输入。
- 不把服务端密钥、主目录或站点源码暴露给运行工作区。
- 限制运行时长、磁盘、并发、网络和子进程。
- 公共多用户版本必须使用容器级隔离；仅靠应用目录约定不够。

### 产品边界

Codex SDK 是代码代理执行层，不是传统“文本转图片”接口。前端 UI 案例的主要产物应是 **可运行代码 + HTML 预览 + 截图**。如果未来案例需要生成纯图片，应增加专门的图片生成 Runner，而不是强行让 Codex SDK 代替图片模型。

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
4. Codex SDK 在隔离目录生成页面。
5. 自动构建、浏览器验证和截图。
6. 在案例详情页展示运行结果与复现信息。

这个样板跑通后，案例数量只是内容生产问题；如果先做大目录，生成与复现协议没定，后面加入技能案例时会重新建模。
