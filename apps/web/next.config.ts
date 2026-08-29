import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@vibe-case/ai", "@vibe-case/cases", "@vibe-case/db"],
};

export default nextConfig;
