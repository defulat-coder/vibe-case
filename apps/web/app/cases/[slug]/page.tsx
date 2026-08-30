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
  return (
    <main className="case-detail-page">
      <Link className="back-link" href="/collections/ui"><ArrowLeft size={16} />返回案例库</Link>
      <section className="case-detail-hero">
        <div className="case-detail-copy">
          <AvatarTile randomKey={`case:${item.id}`} className="data-avatar detail-data-avatar" alt="" priority />
          <h1>{item.title.zhCN}</h1>
          <p>{item.summary.zhCN}</p>
          <div className="detail-meta-row"><span>{item.categoryLabel}</span></div>
          <div className="detail-actions"><a className="button" href="#generation-studio">开始生成</a></div>
        </div>
        <div className="case-detail-visual">
          <CaseDiagram id={item.id} category={item.category} label={item.title.zhCN} />
        </div>
      </section>

      <section className="prompt-section" id="case-prompt">
        <div className="prompt-heading"><h2>Prompt</h2></div>
        <div className="prompt-columns">
          <article><span>中文</span><p>{item.prompt.zhCN}</p><CopyButton value={item.prompt.zhCN} label="复制中文 Prompt" /></article>
          <article><span>English</span><p>{item.prompt.sourceEN}</p><CopyButton value={item.prompt.sourceEN} label="复制 English Prompt" /></article>
        </div>
      </section>

      <GenerationStudio key={item.id} item={item} />
    </main>
  );
}
