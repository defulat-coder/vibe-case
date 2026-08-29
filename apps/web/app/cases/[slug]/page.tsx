import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cases, getCaseBySlug } from "@vibe-case/cases";
import { CaseDiagram } from "@/components/case-diagram";
import { CopyButton } from "@/components/copy-button";
import { GenerationStudio } from "@/components/generation-studio";
import { AvatarTile } from "@/components/avatar-tile";

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getCaseBySlug((await params).slug);
  return item ? { title: item.title.zhCN, description: item.summary.zhCN } : {};
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getCaseBySlug((await params).slug);
  if (!item) notFound();
  const caseIndex = cases.findIndex((candidate) => candidate.id === item.id);

  return (
    <main className="case-detail-page">
      <Link className="back-link" href="/collections/ui"><ArrowLeft size={16} />返回案例库</Link>
      <section className="case-detail-hero">
        <div className="case-detail-copy">
          <h1>{item.title.zhCN}</h1>
          <p>{item.summary.zhCN}</p>
          <span className="source-title">{item.title.sourceEN}</span>
          <div className="detail-meta-row"><span>分类：{item.categoryLabel}</span><span>案例 ID：{item.id.toUpperCase()}</span></div>
          <div className="detail-actions"><a className="button" href="#generation-studio">开始生成</a><a className="text-link" href="#case-prompt">查看 Prompt</a></div>
        </div>
        <div className="case-detail-visual">
          <CaseDiagram id={item.id} category={item.category} label={item.title.zhCN} />
          <div className="detail-guide"><AvatarTile index={caseIndex} alt="" priority /><span>案例向导</span></div>
        </div>
      </section>

      <section className="prompt-section" id="case-prompt">
        <div className="prompt-heading"><h2>案例 Prompt</h2><p>中文经过自然重写，English 原文完整保留。</p></div>
        <div className="prompt-columns">
          <article><span>ZH-CN</span><p>{item.prompt.zhCN}</p><CopyButton value={item.prompt.zhCN} label="复制中文 Prompt" /></article>
          <article><span>EN</span><p>{item.prompt.sourceEN}</p><CopyButton value={item.prompt.sourceEN} label="复制 English 原文" /></article>
        </div>
      </section>

      <GenerationStudio item={item} caseIndex={caseIndex} />
    </main>
  );
}
