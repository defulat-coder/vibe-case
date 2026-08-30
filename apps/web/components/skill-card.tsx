import type { ParsedSkill } from "@vibe-case/skills";
import Link from "next/link";
import type { Ref } from "react";
import { AvatarTile } from "./avatar-tile";

export function SkillCard({ item, entering = false, linkRef }: { item: ParsedSkill; entering?: boolean; linkRef?: Ref<HTMLAnchorElement> }) {
  const metaId = `skill-card-meta-${item.id}`;
  const summaryId = `skill-card-summary-${item.id}`;
  return (
    <article className={`skill-card${entering ? " catalog-card-entering" : ""}`}>
      <Link ref={linkRef} href={`/skills/${item.slug}`} aria-label={`查看 Skill：${item.title.zhCN}`} aria-describedby={`${metaId} ${summaryId}`}>
        <div className="skill-card-meta" id={metaId}>
          <AvatarTile randomKey={`skill:${item.id}`} className="data-avatar card-data-avatar" alt="" />
          <span>{item.categoryLabel}</span>
          <span>{item.cases.length} 个案例</span>
        </div>
        <div className="skill-card-copy">
          <h2>{item.title.zhCN}</h2>
          <p id={summaryId}>{item.summary.zhCN}</p>
        </div>
      </Link>
    </article>
  );
}
