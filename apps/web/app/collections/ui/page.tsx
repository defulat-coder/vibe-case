import type { Metadata } from "next";
import { cases, categories } from "@vibe-case/cases";
import { CaseExplorer } from "@/components/case-explorer";

export const metadata: Metadata = { title: "UI 案例库" };

export default function UICollectionPage() {
  return (
    <main className="collection-page">
      <header className="collection-intro">
        <div><h1>92 个 UI 结构，<br />按功能快速找到。</h1><p>默认显示自然中文，保留 English 原文、模式名和缩写。搜索功能、筛选分类，进入案例查看 Prompt 与生成效果。</p></div>
        <dl className="collection-summary">
          <div><dt>分类</dt><dd>15</dd></div>
          <div><dt>案例</dt><dd>92</dd></div>
          <div><dt>输出</dt><dd>HTML Preview</dd></div>
        </dl>
      </header>
      <CaseExplorer items={cases} categories={categories} />
    </main>
  );
}
