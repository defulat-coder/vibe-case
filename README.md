# Vibe Case

中文优先的 AI 案例集。首个集合包含 15 个分类、92 个 UI 结构案例，并通过 Vercel AI SDK 生成自包含 HTML 预览。

## 开发

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm dev
```

打开 <http://localhost:3000>。

没有配置 `AI_GATEWAY_API_KEY` 时，生成接口会返回一份可验证的本地 Demo；配置 Key 后使用 `AI_MODEL` 指定的 AI Gateway 模型。数据库默认使用本地 libSQL 文件，线上通过同一套接口连接 Turso。

## 检查

```bash
pnpm typecheck
pnpm test
pnpm lint
pnpm build
```

## Monorepo

- `apps/web`：Next.js 案例站、AI 生成和 iframe 预览。
- `packages/ai`：AI SDK、Prompt 与输出 Schema。
- `packages/cases`：92 个案例、中文映射、搜索与校验。
- `packages/db`：Turso / libSQL / Drizzle 生成记录。
- `content/cases/ui/cases.en.json`：VibeUI 英文源内容。

产品范围和验收标准见 [IMPLEMENTATION_GOAL.md](./IMPLEMENTATION_GOAL.md)。

## 部署

推荐使用 GitHub Actions 做质量检查，Vercel Git Integration 做 Preview / Production 自动部署，Turso 保存线上生成记录。首次连接与验收步骤见 [DEPLOYMENT.md](./DEPLOYMENT.md)。
