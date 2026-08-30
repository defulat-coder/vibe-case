import Link from "next/link";
import type { Ref } from "react";
import type { UICase } from "@vibe-case/cases";
import { CaseDiagram } from "./case-diagram";
import { AvatarTile } from "./avatar-tile";

export function CaseCard({ item, entering = false, linkRef }: { item: UICase; entering?: boolean; linkRef?: Ref<HTMLAnchorElement> }) {
  return (
    <article className={`case-card${entering ? " catalog-card-entering" : ""}`}>
      <Link ref={linkRef} href={`/cases/${item.slug}`} aria-label={`查看案例：${item.title.zhCN}`}>
        <div className="case-card-meta">
          <span>{item.categoryLabel}</span>
          <AvatarTile randomKey={`case:${item.id}`} className="data-avatar card-data-avatar" alt="" />
        </div>
        <div className="case-card-visual">
          <CaseDiagram id={item.id} category={item.category} label={item.title.zhCN} />
        </div>
        <div className="case-card-copy">
          <h2>{item.title.zhCN}</h2>
          <p>{item.summary.zhCN}</p>
        </div>
      </Link>
    </article>
  );
}
