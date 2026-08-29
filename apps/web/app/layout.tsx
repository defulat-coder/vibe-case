import type { Metadata } from "next";
import { AppHeader } from "@/components/app-header";
import "./globals.css";
import "@fontsource/zcool-kuaile/400.css";
import "@fontsource-variable/manrope";

export const metadata: Metadata = {
  title: { default: "Vibe Case — 中文 AI 案例集", template: "%s · Vibe Case" },
  description: "中文优先的 UI 与 Skills 案例集，保留英文术语，并通过 AI SDK 运行可复现的案例。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
