import type { Metadata } from "next";
import { Suspense } from "react";
import { cases, categories } from "@vibe-case/cases";
import { CaseExplorer } from "@/components/case-explorer";

export const metadata: Metadata = { title: "UI 案例库" };

export default function UICollectionPage() {
  return (
    <main className="collection-page">
      <header className="collection-intro">
        <h1>UI 案例</h1>
        <p>{cases.length} 个可直接取用的界面结构，附双语 Prompt，可现场生成。</p>
      </header>
      {/* useSearchParams 需要 Suspense 边界以保持静态预渲染 */}
      <Suspense>
        <CaseExplorer items={cases} categories={categories} />
      </Suspense>
    </main>
  );
}
