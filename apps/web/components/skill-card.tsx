import type { ParsedSkill } from "@vibe-case/skills";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AvatarTile } from "./avatar-tile";

export function SkillCard({ item, index }: { item: ParsedSkill; index: number }) {
  return (
    <article className="skill-card">
      <Link href={`/skills/${item.slug}`} aria-label={`查看 Skill：${item.title.zhCN}`}>
        <div className="skill-card-meta"><span>{item.categoryLabel}</span><span>{item.source.installs.toLocaleString("zh-CN")} installs</span></div>
        <div className="skill-card-map" data-category={item.category}>
          <div className="skill-map-source"><span>SKILL.md</span><strong>{item.title.sourceEN}</strong></div>
          <ol>{item.workflow.slice(0, 3).map((step) => <li key={step}>{step}</li>)}</ol>
          <div className="skill-map-output">{item.outputs[0]}</div>
          <AvatarTile index={index + 24} className="skill-card-guide" alt="" />
        </div>
        <div className="skill-card-copy">
          <h2>{item.title.zhCN}</h2>
          <p>{item.summary.zhCN}</p>
          <span>{item.cases.length} 个可运行案例</span>
        </div>
        <ArrowUpRight className="skill-card-arrow" size={18} aria-hidden="true" />
      </Link>
    </article>
  );
}
