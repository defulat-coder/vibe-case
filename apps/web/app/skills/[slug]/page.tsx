import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getSkillBySlug, skills } from "@vibe-case/skills";
import { AvatarTile } from "@/components/avatar-tile";
import { SkillCaseRunner } from "@/components/skill-case-runner";

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
  const index = skills.findIndex((candidate) => candidate.id === skill.id);

  return (
    <main className="skill-detail-page">
      <Link className="back-link" href="/collections/skills"><ArrowLeft size={16} />返回 Skills 案例集</Link>
      <section className="skill-detail-hero">
        <div className="skill-detail-copy">
          <h1>{skill.title.zhCN}</h1>
          <p>{skill.summary.zhCN}</p>
          <span className="source-title">{skill.title.sourceEN}</span>
          <div className="detail-actions"><a className="button" href="#skill-cases">运行案例</a><a className="text-link" href={skill.source.skillsShUrl} target="_blank" rel="noreferrer">查看原 Skill <ArrowUpRight size={15} /></a></div>
        </div>
        <div className="skill-detail-map">
          <div className="skill-source-block"><span>SOURCE</span><strong>{skill.source.repository}</strong><small>{skill.source.skillPath}</small></div>
          <ol>{skill.workflow.map((step) => <li key={step}><CheckCircle2 size={18} /><span>{step}</span></li>)}</ol>
          <div className="skill-output-block"><span>OUTPUT</span><strong>{skill.outputs.join(" · ")}</strong></div>
          <AvatarTile index={index + 36} className="skill-detail-guide" alt="" priority />
        </div>
      </section>

      <section className="skill-method-section">
        <div className="skill-method-copy"><h2>什么时候使用</h2><p>以下触发条件来自原始 Skill 的用途描述，并经过中文结构化。</p></div>
        <ul>{skill.whenToUse.map((item) => <li key={item}>{item}</li>)}</ul>
        <dl className="skill-provenance">
          <div><dt>Status</dt><dd className="skill-status"><i aria-hidden="true" />自动同步 · {skill.status}</dd></div>
          <div><dt>Repository</dt><dd><a href={skill.source.githubUrl} target="_blank" rel="noreferrer">{skill.source.repository}</a></dd></div>
          <div><dt>License</dt><dd>{skill.source.license}</dd></div>
          <div><dt>Commit</dt><dd>{skill.source.commit ? skill.source.commit.slice(0, 8) : "下次同步补全"}</dd></div>
          <div><dt>Installs</dt><dd>{skill.source.installs.toLocaleString("zh-CN")}</dd></div>
        </dl>
        {skill.riskNotes.length > 0 && <aside className="skill-risk"><strong>解析边界</strong>{skill.riskNotes.map((note) => <p key={note}>{note}</p>)}</aside>}
      </section>

      <section className="skill-cases-section" id="skill-cases">
        <div className="section-heading"><h2>直接运行案例</h2><p>Prompt 可以先修改再运行。图片案例使用 GPT Image 2，其余案例返回结构化方法结果。</p></div>
        <div className="skill-case-grid">{skill.cases.map((item) => <SkillCaseRunner key={item.id} item={item} />)}</div>
      </section>
    </main>
  );
}
