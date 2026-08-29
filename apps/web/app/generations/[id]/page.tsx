import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getGeneration } from "@vibe-case/db";
import { getCaseById } from "@vibe-case/cases";
import type { UIGenerationResult } from "@vibe-case/ai/schemas";

export const dynamic = "force-dynamic";

function secureSrcDoc(html: string) {
  const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'">`;
  return html.replace(/<base\b[^>]*>/gi, "").replace(/<head\b[^>]*>/i, (head) => `${head}${csp}`);
}

export default async function GenerationPage({ params }: { params: Promise<{ id: string }> }) {
  const generation = await getGeneration((await params).id);
  if (!generation) notFound();
  const item = getCaseById(generation.caseId);
  const result = generation.resultJson ? JSON.parse(generation.resultJson) as UIGenerationResult : undefined;

  return (
    <main className="generation-page">
      <Link className="back-link" href={item ? `/cases/${item.slug}` : "/collections/ui"}><ArrowLeft size={16} />返回案例</Link>
      <header><div><span className={`status-badge ${generation.status}`}>{generation.status}</span><h1>{result?.title ?? item?.title.zhCN ?? "生成记录"}</h1></div><dl><div><dt>模型</dt><dd>{generation.model}</dd></div><div><dt>耗时</dt><dd>{generation.durationMs ? `${(generation.durationMs / 1000).toFixed(1)}s` : "—"}</dd></div></dl></header>
      {result ? <iframe className="generation-frame" title="已保存的 HTML 生成结果" sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={secureSrcDoc(result.html)} /> : <div className="record-empty"><h2>结果尚未就绪</h2><p>{generation.error ?? "生成仍在进行，稍后刷新页面。"}</p></div>}
      <section className="record-prompt"><h2>本次 Prompt</h2><p>{generation.prompt}</p></section>
    </main>
  );
}
