# 部署方案

项目采用 GitHub Actions 负责质量检查、Vercel Git Integration 负责 Preview 与 Production 部署、Turso 负责线上 libSQL 数据持久化。

## 部署链路

- Pull Request：GitHub Actions 执行类型检查、测试、Lint 和构建；Vercel 创建独立 Preview Deployment。
- `main` 分支：通过相同检查后，Vercel 创建 Production Deployment。
- Vercel 不依赖 GitHub Actions 中保存部署 Token，部署权限和预览地址由官方 Git Integration 管理。

## 首次连接

1. 在 Vercel 中导入 GitHub 仓库 `defulat-coder/vibe-case`。
2. Framework Preset 选择 Next.js，Root Directory 选择 `apps/web`，其余构建设置保持自动检测。
3. 从 Vercel Marketplace 安装 Turso，创建或连接数据库。
4. 在 Vercel 项目中为 Production、Preview 和 Development 配置以下环境变量：

   | 变量 | 用途 |
   | --- | --- |
   | `AI_GATEWAY_API_KEY` | Vercel AI Gateway 凭证 |
   | `AI_MODEL` | AI SDK 使用的模型，默认 `openai/gpt-5.6-terra` |
   | `TURSO_DATABASE_URL` | Turso 数据库 URL |
   | `TURSO_AUTH_TOKEN` | Turso 数据库 Token |

5. 在 GitHub 仓库设置中把 `Verify` 设为 `main` 分支的 required status check；如需严格禁止检查失败时部署，再把该检查添加为 Vercel Deployment Check。

## 本地开发

复制环境变量模板：

```bash
cp apps/web/.env.example apps/web/.env.local
```

默认的 `TURSO_DATABASE_URL=file:.data/vibe-case.db` 使用本地 libSQL 文件，不要求联网。线上必须配置 Turso URL 和 Token；不要提交 `.env.local`、数据库文件或密钥。

## 发布验证

提交 Pull Request 后确认：

1. GitHub Actions 的 `Verify` 全部通过。
2. Vercel Preview 首页、案例详情和生成页可访问。
3. 无 AI Gateway Key 时生成接口返回本地 Demo；配置 Key 后返回模型生成的 HTML。
4. 生成记录写入 Turso，并可通过 `/generations/{id}` 再次访问。
