import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getGeneration } from "@vibe-case/db";
import { getCaseById } from "@vibe-case/cases";
import type { UIGenerationResult } from "@vibe-case/ai/schemas";
import { secureSrcDoc } from "@/components/secure-src-doc";

export const dynamic = "force-dynamic";

export default async function GenerationPage({ params }: { params: Promise<{ id: string }> }) {
  const generation = await getGeneration((await params).id);
  if (!generation) notFound();
  const item = getCaseById(generation.caseId);
  const result = generation.resultJson ? JSON.parse(generation.resultJson) as UIGenerationResult : undefined;

  return (
    <main className="generation-page">
      <Link className="back-link" href={item ? `/cases/${item.slug}` : "/collections/ui"}><ArrowLeft size={16} />返回案例</Link>
      <header><h1>{result?.title ?? item?.title.zhCN ?? "生成记录"}</h1></header>
      {result ? <iframe className="generation-frame" title="已保存的 HTML 生成结果" sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={secureSrcDoc(result.html)} /> : <div className="record-empty"><h2>结果尚未就绪</h2><p>{generation.error ?? "生成仍在进行，稍后刷新页面。"}</p></div>}
      <section className="record-prompt"><h2>本次 Prompt</h2><p>{generation.prompt}</p></section>
    </main>
  );
}
