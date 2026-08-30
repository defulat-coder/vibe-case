import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSkillBySlug, skills, type ParsedSkill } from "@vibe-case/skills";
import { SkillCaseRunner } from "@/components/skill-case-runner";
import { AvatarTile } from "@/components/avatar-tile";

export function generateStaticParams() {
  return skills.map((skill) => ({ slug: skill.slug }));
}

// SKILL.md 正文中的相对图片和链接指向来源仓库，按仓库与 commit 解析为可访问的绝对地址
function skillMarkdownComponents(skill: ParsedSkill): Components {
  const dir = skill.source.skillPath.split("/").slice(0, -1).join("/");
  const base = `https://github.com/${skill.source.repository}/blob/${skill.source.commit}${dir ? `/${dir}` : ""}`;
  const rawBase = `https://raw.githubusercontent.com/${skill.source.repository}/${skill.source.commit}${dir ? `/${dir}` : ""}`;
  return {
    // 页面已有 h1（Skill 标题），正文标题整体降一级，保持文档大纲合法
    h1: (props) => <h2 {...props} />,
    h2: (props) => <h3 {...props} />,
    h3: (props) => <h4 {...props} />,
    h4: (props) => <h5 {...props} />,
    h5: (props) => <h6 {...props} />,
    // GFM 任务列表的 disabled checkbox 缺少上下文，补充可读状态
    input: ({ type, checked, disabled }) =>
      type === "checkbox" ? (
        <input type="checkbox" checked={checked} disabled={disabled} readOnly aria-label={checked ? "任务项：已完成" : "任务项：未完成"} />
      ) : (
        <input type={type} />
      ),
    img: ({ src, alt }) => {
      const resolved = typeof src === "string" && !/^(https?:)?\/\//.test(src) ? `${rawBase}/${src}` : src;
      // eslint-disable-next-line @next/next/no-img-element -- 远程来源仓库图片，尺寸未知
      return <img src={resolved} alt={alt ?? ""} loading="lazy" />;
    },
    a: ({ href, children }) => {
      const resolved = href && !/^(https?:)?\/\/|^#|^mailto:/.test(href) ? `${base}/${href}` : href;
      return <a href={resolved} target="_blank" rel="noreferrer">{children}</a>;
    },
  };
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
          <AvatarTile randomKey={`skill:${skill.id}`} className="data-avatar detail-data-avatar" alt="" priority />
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

      <section className="skill-content-section">
        <div className="section-heading"><h2>Skill 原文</h2><p>中文翻译保留 GPT Image 2、Prompt、UI、UX 等专有名词；英文原文在下方折叠区。</p></div>
        <div className="skill-content"><Markdown remarkPlugins={[remarkGfm]} components={skillMarkdownComponents(skill)}>{skill.content.zhCN}</Markdown></div>
        <details className="skill-content-fold">
          <summary>查看英文原文 SKILL.md</summary>
          <div className="skill-content"><Markdown remarkPlugins={[remarkGfm]} components={skillMarkdownComponents(skill)}>{skill.content.sourceEN}</Markdown></div>
        </details>
      </section>

      <section className="skill-cases-section" id="skill-cases">
        <div className="section-heading"><h2>运行案例</h2></div>
        <div className="skill-case-grid">{skill.cases.map((item) => <SkillCaseRunner key={item.id} item={item} />)}</div>
      </section>
    </main>
  );
}
