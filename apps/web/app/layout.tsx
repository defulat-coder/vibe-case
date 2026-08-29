/*
THESIS: Vibe Case is a functional case library with a friendly illustrated supporting cast.
OWN-WORLD: creamy canvas, heavy black ink, functional diagrams, pastel accents, and small high-quality-100 avatar guide marks.
STORY: discover a functional pattern, understand its prompt, adjust variables, and generate a safe live result.
FIRST VIEWPORT: a real case structure and its generation flow lead; one small portrait guide adds identity without competing.
FORM: feature-first case system with the user-pinned high-quality-100 portraits as supporting brand evidence.
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
  THESIS: "Vibe Case is a functional case library with a friendly illustrated supporting cast.",
  "OWN-WORLD": "Creamy canvas, heavy black ink, functional diagrams, pastel accents, and small high-quality-100 avatar guide marks.",
  STORY: "Discover a functional pattern, understand its prompt, adjust variables, and generate a safe live result.",
  "FIRST VIEWPORT": "A real case structure and its generation flow lead; one small portrait guide adds identity without competing.",
  FORM: "Feature-first case system with the user-pinned high-quality-100 portraits as supporting brand evidence.",
  FINISH: "unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance",
};

const footerPortraits = Array.from({ length: 14 }, (_, index) => index);

export const metadata: Metadata = {
  title: { default: "Vibe Case — 中文 AI 案例集", template: "%s · Vibe Case" },
  description: "中文优先的 UI 与 Skills 案例集，保留英文术语，并通过 AI SDK 运行可复现的案例。",
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
          <div className="footer-cast" aria-hidden="true">
            {footerPortraits.map((index) => <AvatarTile key={index} index={index} randomKey={`site-footer-${index}`} />)}
            <span className="footer-more"><span className="footer-more-wide">+86</span><span className="footer-more-medium">+90</span><span className="footer-more-small">+92</span></span>
          </div>
          <div className="footer-links"><Link href="/collections/ui">浏览 UI 案例</Link><Link href="/collections/skills">探索 Skills</Link></div>
        </footer>
      </body>
    </html>
  );
}
