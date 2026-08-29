import type { ParsedSkill } from "@vibe-case/skills";
import Link from "next/link";
import { AvatarTile } from "./avatar-tile";

export function SkillCard({ item }: { item: ParsedSkill }) {
  return (
    <article className="skill-card">
      <Link href={`/skills/${item.slug}`} aria-label={`查看 Skill：${item.title.zhCN}`}>
        <div className="skill-card-meta">
          <AvatarTile dataKey={`skill:${item.id}`} className="data-avatar card-data-avatar" alt="" />
          <span>{item.categoryLabel}</span>
          <span>{item.cases.length} 个案例</span>
        </div>
        <div className="skill-card-copy">
          <h2>{item.title.zhCN}</h2>
          <p>{item.summary.zhCN}</p>
        </div>
      </Link>
    </article>
  );
}
