import Link from "next/link";
import { cases } from "@vibe-case/cases";
import { skills } from "@vibe-case/skills";
import { CaseDiagram } from "@/components/case-diagram";

export default function HomePage() {
  const demo = cases[0]!;
  return (
    <main className="home-page">
      <section className="home-intro">
        <div className="home-copy">
          <h1>从案例开始</h1>
          <p>选择 UI 结构或可运行 Skill，先看懂方法，再把 Prompt 变成结果。</p>
        </div>
        <div className="home-showcase">
          <article className="home-stage">
            <div className="home-stage-toolbar"><span>{demo.categoryLabel} · {demo.id.toUpperCase()}</span><span>LIVE STRUCTURE</span></div>
            <div className="home-stage-visual"><CaseDiagram id={demo.id} category={demo.category} label={demo.title.zhCN} /></div>
            <div className="home-stage-info">
              <div><span>功能案例</span><h2>{demo.title.zhCN}</h2><p>{demo.summary.zhCN}</p></div>
              <Link className="button" href={`/cases/${demo.slug}`}>查看 Prompt</Link>
            </div>
          </article>
          <div className="home-libraries">
            <Link href="/collections/ui"><span>{cases.length} 个案例</span><h2>UI 案例</h2><p>查看 Prompt，生成页面。</p></Link>
            <Link href="/collections/skills"><span>{skills.length} 个 Skills</span><h2>Skills</h2><p>修改 Prompt，直接运行。</p></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
