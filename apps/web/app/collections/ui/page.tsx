import type { Metadata } from "next";
import { cases, categories } from "@vibe-case/cases";
import { CaseExplorer } from "@/components/case-explorer";

export const metadata: Metadata = { title: "UI 案例库" };

export default function UICollectionPage() {
  return (
    <main className="collection-page">
      <header className="collection-intro">
        <h1>UI 案例</h1>
      </header>
      <CaseExplorer items={cases} categories={categories} />
    </main>
  );
}
