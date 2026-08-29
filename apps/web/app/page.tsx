import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cases } from "@vibe-case/cases";
import { CaseCard } from "@/components/case-card";
import { HeroCast } from "@/components/hero-cast";

export default function HomePage() {
  const featured = [cases[1], cases[14], cases[31], cases[69]];

  return (
    <main>
      <section className="home-intro">
        <div className="home-copy">
          <h1>和一群有趣的人，<br />一起把 Prompt 变成页面。</h1>
          <p>100 位手绘灵感角色，陪你浏览 15 个分类、92 个中文 UI 案例。读懂结构，复制 Prompt，或者直接生成一份安全预览的 HTML。</p>
          <div className="home-actions">
            <Link className="button" href="/collections/ui">进入 UI 案例库 <ArrowRight size={17} /></Link>
            <a className="text-link" href="#how-it-works">它如何工作</a>
          </div>
        </div>

        <HeroCast />
      </section>

      <section className="featured-cases">
        <div className="section-heading"><h2>先认识四位案例向导</h2><p>从登录、Bento 到 Hero 与 Dashboard，每个角色都带着一份可以直接使用的结构。</p></div>
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
