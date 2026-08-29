/*
THESIS: Vibe Case is a friendly illustrated community of ideas, not a technical ledger or a generic SaaS gallery.
OWN-WORLD: creamy canvas, heavy black ink, pastel portrait tiles, friendly rounded sans type, and the real high-quality-100 avatar cast.
STORY: meet a visual character, discover a case, understand its prompt, and generate a safe live result.
FIRST VIEWPORT: an expressive cast of portraits surrounds a direct Chinese promise about the 92-case library and its generation flow.
FORM: user-pinned high-quality-100 portrait world; seed key avatar-world-hq100; the prior specimen-ledger identity is replaced.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
*/
import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { AvatarTile } from "@/components/avatar-tile";
import "./globals.css";
import "@fontsource/zcool-kuaile/400.css";
import "@fontsource-variable/manrope";

const directionContract = {
  THESIS: "Vibe Case is a friendly illustrated community of ideas, not a technical ledger or a generic SaaS gallery.",
  "OWN-WORLD": "Creamy canvas, heavy black ink, pastel portrait tiles, friendly rounded display type, and the real high-quality-100 avatar cast.",
  STORY: "Meet a visual character, discover a case, understand its prompt, and generate a safe live result.",
  "FIRST VIEWPORT": "An expressive cast of portraits encroaches around a direct Chinese promise about the 92-case library and its generation flow.",
  FORM: "User-pinned high-quality-100 portrait world; seed key avatar-world-hq100; the prior specimen-ledger identity is replaced.",
  FINISH: "unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance",
};

export const metadata: Metadata = {
  title: { default: "Vibe Case — 中文 AI 案例集", template: "%s · Vibe Case" },
  description: "92 个中文 UI 案例，保留英文术语，并通过 AI SDK 生成可预览的 HTML 效果。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body data-direction-seed="avatar-world-hq100">
        <script id="impeccable-direction-contract" type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(directionContract) }} />
        <AppHeader />
        {children}
        <footer className="site-footer">
          <div>
            <strong>Vibe Case</strong>
            <p>案例不是灵感截图，而是可以读懂、复制和生成的工作样本。</p>
          </div>
          <div className="footer-cast" aria-hidden="true">{[8, 31, 70].map((index) => <AvatarTile key={index} index={index} />)}</div>
          <Link href="/collections/ui">浏览 92 个 UI 案例</Link>
        </footer>
      </body>
    </html>
  );
}
