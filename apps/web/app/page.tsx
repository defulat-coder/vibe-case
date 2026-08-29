import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cases } from "@vibe-case/cases";
import { AvatarTile } from "@/components/avatar-tile";
import { CaseCard } from "@/components/case-card";
import { CaseDiagram } from "@/components/case-diagram";

export default function HomePage() {
  const featured = [cases[1], cases[14], cases[31], cases[69]];
  const demo = cases[1];

  return (
    <main>
      <section className="home-intro">
        <div className="home-copy">
          <h1>从案例出发，<br />把 Prompt 变成页面。</h1>
          <p>浏览 92 个中文 UI 结构案例和持续更新的 Skills 案例。先看懂方法，再调整 Prompt，最后通过 AI SDK 运行结果。</p>
          <div className="home-actions">
            <Link className="button" href="/collections/ui">浏览 92 个案例 <ArrowRight size={17} /></Link>
            <Link className="button button-secondary" href="/collections/skills">探索 Skills</Link>
          </div>
        </div>

        <article className="home-demo" aria-label="案例生成流程预览">
          <div className="home-demo-toolbar"><span>{demo.id.toUpperCase()} · {demo.categoryLabel}</span><span>HTML Preview</span></div>
          <div className="home-demo-canvas"><CaseDiagram id={demo.id} category={demo.category} label={demo.title.zhCN} /></div>
          <div className="home-demo-brief">
            <div className="home-demo-guide"><AvatarTile index={1} alt="" /><span>案例向导</span></div>
            <div><h2>{demo.title.zhCN}</h2><p>{demo.summary.zhCN}</p></div>
          </div>
          <dl className="home-demo-flow">
            <div><dt>结构</dt><dd>明确页面骨架</dd></div>
            <div><dt>Prompt</dt><dd>中英双语可复制</dd></div>
            <div><dt>生成</dt><dd>AI SDK 安全预览</dd></div>
          </dl>
        </article>
      </section>

      <section className="featured-cases">
        <div className="section-heading"><h2>热门功能案例</h2><p>从登录、Bento 到 Hero 与 Dashboard，先比较结构，再进入详情调整 Prompt。</p></div>
        <div className="case-grid compact">
          {featured.map((item, index) => <CaseCard key={item.id} item={item} index={index} />)}
        </div>
      </section>

      <section className="workflow-section" id="how-it-works">
        <div className="workflow-statement"><h2>不是图库，也不是代码 Agent。</h2><p>案例负责讲清结构，AI SDK 负责生成结果，iframe 负责安全地让结果出现。</p></div>
        <ol>
          <li><CheckCircle2 size={19} /><div><strong>选择案例</strong><span>搜索中文、English 或专有名词。</span></div></li>
          <li><CheckCircle2 size={19} /><div><strong>调整 Prompt</strong><span>保留结构，替换品牌、用户和视觉气质。</span></div></li>
          <li><CheckCircle2 size={19} /><div><strong>预览 HTML</strong><span>结果不写文件，只在安全 iframe 中运行。</span></div></li>
        </ol>
      </section>
    </main>
  );
}
