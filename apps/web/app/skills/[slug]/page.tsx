import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getSkillBySlug, skills } from "@vibe-case/skills";
import { SkillCaseRunner } from "@/components/skill-case-runner";
import { AvatarTile } from "@/components/avatar-tile";

export function generateStaticParams() {
  return skills.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const skill = getSkillBySlug((await params).slug);
  return skill ? { title: skill.title.zhCN, description: skill.summary.zhCN } : {};
}

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const skill = getSkillBySlug((await params).slug);
  if (!skill) notFound();

  return (
    <main className="skill-detail-page">
      <Link className="back-link" href="/collections/skills"><ArrowLeft size={16} />返回 Skills 案例集</Link>
      <section className="skill-detail-hero">
        <div className="skill-detail-copy">
          <AvatarTile dataKey={`skill:${skill.id}`} className="data-avatar detail-data-avatar" alt="" priority />
          <h1>{skill.title.zhCN}</h1>
          <p>{skill.summary.zhCN}</p>
          <div className="detail-actions"><a className="button" href="#skill-cases">运行案例</a><a className="text-link" href={skill.source.skillsShUrl} target="_blank" rel="noreferrer">查看原 Skill <ArrowUpRight size={15} /></a></div>
        </div>
        <div className="skill-workflow">
          <h2>工作流程</h2>
          <ol>{skill.workflow.map((step) => <li key={step}>{step}</li>)}</ol>
        </div>
      </section>

      <section className="skill-method-section">
        <div className="skill-method-copy"><h2>适用场景</h2></div>
        <ul>{skill.whenToUse.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="skill-source-line">来源：<a href={skill.source.githubUrl} target="_blank" rel="noreferrer">{skill.source.repository}</a>{skill.source.license && <> · {skill.source.license}</>}</p>
      </section>

      <section className="skill-cases-section" id="skill-cases">
        <div className="section-heading"><h2>运行案例</h2></div>
        <div className="skill-case-grid">{skill.cases.map((item) => <SkillCaseRunner key={item.id} item={item} />)}</div>
      </section>
    </main>
  );
}
