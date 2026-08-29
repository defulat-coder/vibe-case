import type { Metadata } from "next";
import { cases, categories } from "@vibe-case/cases";
import { CaseExplorer } from "@/components/case-explorer";
import { AvatarTile } from "@/components/avatar-tile";

export const metadata: Metadata = { title: "UI 案例库" };

export default function UICollectionPage() {
  return (
    <main className="collection-page">
      <header className="collection-intro">
        <div><h1>92 个 UI 结构，<br />由 92 位角色带你认识。</h1><p>默认显示自然中文，保留 English 原文、模式名和缩写。选择一个角色，进入他的案例。</p></div>
        <div className="collection-cast" aria-hidden="true">
          {[4, 16, 28, 43, 61, 77].map((index) => <AvatarTile key={index} index={index} />)}
        </div>
      </header>
      <CaseExplorer items={cases} categories={categories} />
    </main>
  );
}
