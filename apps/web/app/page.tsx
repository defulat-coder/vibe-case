import Link from "next/link";
import { cases } from "@vibe-case/cases";
import { skills } from "@vibe-case/skills";

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-intro">
        <div className="home-copy">
          <h1>从案例开始</h1>
          <p>选择 UI 结构或可运行 Skill。</p>
        </div>
        <div className="home-libraries">
          <Link href="/collections/ui">
            <span>{cases.length} 个案例</span>
            <h2>UI 案例</h2>
            <p>查看 Prompt，生成页面。</p>
          </Link>
          <Link href="/collections/skills">
            <span>{skills.length} 个 Skills</span>
            <h2>Skills</h2>
            <p>修改 Prompt，直接运行。</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
