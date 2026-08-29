# Vibe Case 端到端实现目标

> 状态：已实现并验证
> 范围：项目基础架构、VibeUI 内容复刻、AI SDK 生成闭环、持续 Skills 探索与案例模块
> 约束：TypeScript Monorepo；不操作设计文件、项目文件、Shell 或 workspace

## 1. 产品目标

构建一个中文优先的 AI 案例集网站。首个集合完整复刻 VibeUI 的前端 UI 案例内容，但不复刻其页面布局、品牌和营销内容。

用户能够：

1. 浏览 15 个 UI 分类和 92 个案例。
2. 用中文或英文搜索案例。
3. 查看中文标题、中文说明、中文 Prompt、英文原文和参考图片。
4. 复制中文 Prompt 或英文原文。
5. 修改案例变量并上传一张可选参考图。
6. 通过 Vercel AI SDK 生成自包含 HTML 效果。
7. 在安全 iframe 中直接预览结果。
8. 查看并重新生成历史结果。

项目已经增加 Skills 案例集：定期从 Skills.sh 与 GitHub 探索独立作者的创作类 Skill，自动解析、中文结构化并生成案例。解析成功后立即可用，不设置人工审核和发布逻辑。

## 2. 用户端到端路径

```text
进入首页
  → 浏览集合或搜索案例
  → 打开案例详情
  → 查看效果、Prompt 和英文原文
  → 复制 Prompt
  或
  → 编辑变量并选择参考图
  → 点击生成
  → AI SDK 流式返回生成状态
  → 校验结构化结果
  → sandboxed iframe 展示 HTML
  → 保存生成记录
  → 重新生成或返回案例库
```

首版成功的标志不是“模型返回了文本”，而是用户从案例详情发起生成后，能够在同一产品内看到完整、可交互、被安全隔离的 HTML 效果。

## 3. 已确定的技术栈

| 层级 | 选型 |
|---|---|
| 语言 | TypeScript |
| 包管理 | pnpm workspace |
| Monorepo | Turborepo |
| Web | Next.js App Router + React |
| UI | Tailwind CSS + shadcn/ui |
| AI | Vercel AI SDK v7 |
| AI API | `streamText` + `Output.object()` |
| 模型路由 | Vercel AI Gateway，model ID 通过环境变量配置 |
| Schema | Zod |
| 数据库 | Turso / libSQL + Drizzle ORM |
| 流式传输 | AI SDK UI stream |
| 测试 | Vitest + Playwright |
| 前端验证 | ego-lite，通过 CDP 验证桌面端和移动端 |

不使用：

- Codex SDK
- `ToolLoopAgent`
- 文件读写 tools
- Shell 和命令执行
- 独立 Runner 或任务队列
- 临时 workspace、Git 仓库或构建服务
- Figma、Sketch、PSD 等设计文件操作

## 4. Monorepo 基础架构

```text
vibe-case/
  apps/
    web/
      app/
        (library)/
        cases/[slug]/
        generations/[id]/
        api/generate/route.ts
      components/
      lib/
      public/

  packages/
    ai/
      src/
        generate-ui.ts
        schemas.ts
        prompts.ts

    cases/
      src/
        schema.ts
        load-cases.ts
        search-cases.ts
        glossary.ts

    skills/
      src/
        schema.ts
        parser.ts
        data.ts
        sync.ts

    db/
      src/
        schema.ts
        client.ts
        generations.ts

  content/
    cases/
      ui/
    skills/
      sources.json
      catalog.json
      sync-errors.json
    glossary.json

  package.json
  pnpm-workspace.yaml
  turbo.json
  tsconfig.json
```

### 4.1 `apps/web`

唯一应用，负责：

- 案例列表、分类、搜索和详情页。
- Prompt 变量表单与参考图输入。
- 调用 AI SDK Route Handler。
- 展示流式状态和生成结果。
- 在 sandboxed iframe 中渲染 HTML。
- 展示生成历史。

案例内容由 Server Components 直接读取 `packages/cases`，不为静态案例额外建设 REST API。

### 4.2 `packages/ai`

只负责 AI 生成：

- 解析案例 Prompt 模板和用户变量。
- 组装中文 Prompt、英文专有名词和参考图片。
- 调用 Vercel AI Gateway。
- 使用 `streamText` 输出流式状态。
- 使用 `Output.object()` 和 Zod 校验最终结果。

它不依赖数据库、文件系统、浏览器自动化或 Next.js 页面代码。

### 4.3 `packages/cases`

案例内容的唯一入口，负责：

- `CaseDefinition` Schema。
- 15 个分类和 92 个案例的加载与校验。
- 中文、英文和别名搜索。
- 术语表检查。
- Prompt 模板插值。
- 案例数量和分类数量一致性校验。

### 4.4 `packages/db`

只保存生成数据：

- `generations` 表。
- 可选的 `generation_messages` 表。
- 输入、模型、状态、结构化结果、耗时、token usage 和错误信息。

案例正文、Prompt 和静态图片由 Git 管理，不进入数据库。

### 4.5 `packages/skills`

Skills 内容的唯一入口，负责：

- 从白名单来源和预设查询词发现 Skill。
- 过滤大厂官方、云平台、模型聚合器与产品绑定来源。
- 解析 SKILL.md Frontmatter、用途、Workflow、依赖与执行风险。
- 保存 SKILL.md 原文（去除 Frontmatter）并生成中文翻译；翻译保留品牌、模型、框架和缩写等专有名词，删除登录、付费和原始 Shell 执行步骤。
- 用 AI SDK 生成中文结构化信息和两个可运行案例。
- 记录 Repository、License、Commit、内容 Hash 与 Skills.sh 安装量。
- 解析成功后直接标记为 `active` 并进入网站，无审核发布流程。

### 4.6 暂不创建的包

- `packages/ui`：首版只有 `apps/web` 消费 UI。
- `packages/types`：类型跟随所属 package。
- `packages/config`：共享配置先放根目录。

出现第二个真实消费者时再拆分，避免为 Monorepo 制造无效层级。

## 5. 内容复刻目标

### 5.1 内容规模

首个 UI 集合必须达到以下内容对齐：

| 分类 | 中文展示 | 数量 |
|---|---|---:|
| Auth Forms | Auth 表单 | 6 |
| Pricing | Pricing | 8 |
| Features / Bento | Features / Bento | 8 |
| Hero Sections | Hero 区域 | 8 |
| CTA Banners | CTA 横幅 | 7 |
| Stats Bars | Stats 数据条 | 7 |
| Nav Bars | Nav 导航栏 | 8 |
| Testimonials | Testimonials 用户评价 | 8 |
| Footer | Footer | 5 |
| FAQ | FAQ | 5 |
| Dashboards | Dashboard 仪表盘 | 6 |
| Onboarding | Onboarding | 4 |
| Blog / Content | Blog / Content | 4 |
| Contact | Contact | 3 |
| Bonus | Bonus | 5 |
| 合计 | 15 个分类 | 92 |

### 5.2 每个案例必须包含

```ts
type UICase = {
  id: string;
  slug: string;
  category: string;
  title: {
    zhCN: string;
    sourceEN: string;
    aliases: string[];
  };
  summary: {
    zhCN: string;
    sourceEN: string;
  };
  prompt: {
    zhCN: string;
    sourceEN: string;
    version: string;
  };
  thumbnail: string;
  tags: string[];
  variables: CaseVariable[];
  outputMode: "html-preview";
};
```

### 5.3 中文化规则

- 普通描述翻译为自然中文，不保留英文语序。
- 品牌、产品、框架、模型、缩写和约定俗成的 UI 模式保留英文。
- 示例：`Bento 网格`、`Hero 区域`、`Dashboard 仪表盘`、`Magic Link 登录`、`CTA`。
- `sourceEN` 永远保存，不用中文覆盖英文原文。
- 中文和英文都进入搜索索引。
- 同一术语必须使用 `content/glossary.json` 中的唯一首选译法。
- 默认复制中文 Prompt，同时提供“复制英文原文”。

### 5.4 Prompt 复刻规则

每条中文 Prompt 保留原案例的结构意图：

1. 要生成的 UI 类型。
2. 具体布局结构。
3. 必须出现的区域和内容。
4. 关键交互要求。
5. 与参考图片风格保持一致的约束。

中文 Prompt 是基于原意的自然重写，不做逐词直译。专有名词保持英文，例如：

```text
创建一个 Pricing 区域，使用三张并排的方案卡片（Starter、Pro、Business），
将中间方案突出显示为推荐选项。包含方案名称、价格、功能列表和 CTA，
并匹配参考图中的视觉风格、颜色、字体排版和整体审美。
```

### 5.5 图片复刻规则

- 不复制 VibeUI 品牌、Logo、广告或 GlowUp UI 营销图片。
- 每个案例重新制作一张结构示意缩略图，表达相同布局含义。
- 缩略图使用统一的本项目视觉语言，不逐像素复刻原 SVG。
- 已发布案例可以配置人工筛选过的结果截图作为封面。
- 用户上传的参考图片只用于当次模型请求，MVP 不持久化。

### 5.6 内容验收

- 92 个唯一 ID，不重复渲染一份 `All` 数据副本。
- 15 个分类的数量总和严格等于 92。
- 每条案例都有中文标题、中文摘要、中文 Prompt 和英文原文。
- 所有 Prompt 通过术语表检查。
- 中文、英文标题和 aliases 都可搜索。
- 每条案例都有可用缩略图和 alt 文本。

## 6. 页面与交互目标

### 6.1 首页 `/`

- 展示产品定位、集合入口和精选案例。
- 首个集合是“前端 UI 案例”。
- 不复刻 VibeUI 的 Sidebar + Hero 布局。

### 6.2 UI 集合 `/collections/ui`

- 展示 92 个案例。
- 支持分类筛选和全文搜索。
- 搜索范围覆盖中文、英文、别名和标签。
- 无结果时显示清晰的空状态和清除筛选入口。

### 6.3 案例详情 `/cases/[slug]`

- 结构示意图或结果封面。
- 中文标题、摘要、完整 Prompt。
- 英文原文折叠区。
- “复制中文 Prompt”和“复制英文原文”。
- 可编辑变量。
- 可选参考图片。
- “生成效果”主操作。

### 6.4 生成结果 `/generations/[id]`

- `generating`、`validating`、`ready`、`failed` 状态。
- HTML 效果预览。
- 本次 Prompt、输入、模型和生成时间。
- 重新生成。
- 返回原案例。

## 7. AI SDK 生成目标

### 7.1 输入

- 案例中文 Prompt。
- 用户修改后的变量。
- 案例结构约束。
- 一张可选参考图片。
- HTML 输出约束。

### 7.2 输出 Schema

```ts
type UIGenerationResult = {
  title: string;
  summary: string;
  html: string;
  notes: string[];
};
```

### 7.3 HTML 输出约束

- 返回完整、自包含的 HTML 文档。
- CSS 放在 `<style>` 中。
- 可选交互放在内联 `<script>` 中。
- 不依赖 npm、React、Tailwind CDN 或外部构建工具。
- 不返回文件路径、Shell 命令或项目操作说明。
- 不允许 iframe 发起网络请求。
- HTML 大小必须有服务端上限。

### 7.4 安全预览

- 使用 `<iframe sandbox="allow-scripts">`。
- 不设置 `allow-same-origin`。
- 服务端注入 CSP，至少禁止 `connect-src`、表单提交和顶层导航。
- 模型生成 HTML 不直接写入 React DOM。
- 超过大小限制或 Schema 校验失败时不展示，允许用户重试。

## 8. 数据目标

`generations` 至少保存：

```text
id
caseId
status
prompt
variablesJson
model
resultJson
error
inputTokens
outputTokens
durationMs
createdAt
updatedAt
```

MVP 不保存用户上传的参考图片，只保存是否使用参考图以及图片的基础元数据。

## 9. 非目标

- 不复刻 VibeUI 页面布局和品牌视觉。
- 不操作 Figma、Sketch、PSD 或其他设计文件。
- 不读写用户项目文件。
- 不生成或修改本地代码工程。
- 不运行 Shell、安装依赖或启动开发服务器。
- 不接入 Codex SDK。
- 不建设 `ToolLoopAgent` 和 custom tools。
- 不做 GitHub 导入、分支或 Pull Request。
- 不做多用户、计费、推荐系统和向量搜索。
- 不做多模型竞赛。

## 10. 实施里程碑

### M1：Monorepo 与静态案例闭环

- 初始化 pnpm、Turborepo 和 TypeScript。
- 创建 `apps/web`、`packages/ai`、`packages/cases`、`packages/db`。
- 完成案例 Schema、术语表和内容加载。
- 先录入 3 个代表案例，验证页面与数据协议。

### M2：完整内容复刻

- 完成 15 个分类和 92 个案例。
- 完成中英文、aliases、Prompt 和缩略图。
- 加入分类数量、唯一 ID 和术语一致性测试。

### M3：AI SDK 生成闭环

- 接入 AI Gateway。
- 实现 `streamText`、`Output.object()` 和参考图输入。
- 实现生成记录。
- 实现 sandboxed iframe 预览。

### M4：交付验证

- TypeScript、lint、单元测试和构建通过。
- 使用 ego-lite 验证桌面端与移动端核心流程。
- 检查搜索、复制、上传、生成、失败和重新生成状态。
- 检查 iframe 隔离和无网络访问。

## 11. Definition of Done

项目完成需要同时满足：

- Monorepo 结构与本文一致，无多余 app 和 package。
- 15 个分类、92 个案例全部可访问。
- 所有案例完成中文化，同时保留英文专有名词和英文原文。
- 中英文搜索、分类筛选和复制功能正常。
- 至少一个案例可以携带参考图完成 AI SDK 流式生成。
- AI 返回结果通过 Zod Schema 校验。
- 自包含 HTML 能在 sandboxed iframe 中正常展示。
- AI 层没有任何文件、Shell、workspace 或设计文件权限。
- 生成历史可以查看并重新生成。
- 桌面端和移动端核心路径通过 ego-lite 验证。
- 没有关键浏览器控制台错误。

## 12. 实施基线

后续开发以本文为主验收基线。`research/vibeui-audit/implementation-plan.md` 保留调研过程和补充说明；当两份文档出现冲突时，以本文已经确认的范围为准。
