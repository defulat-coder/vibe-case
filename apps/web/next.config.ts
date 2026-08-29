import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@vibe-case/ai", "@vibe-case/cases", "@vibe-case/db"],
  // 基础安全响应头；不配 CSP——页面内联脚本与远程 Skill 图片来源多，CSP 需随部署环境单独设计
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
  ],
};

export default nextConfig;
