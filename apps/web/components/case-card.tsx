import Link from "next/link";
import type { UICase } from "@vibe-case/cases";
import { CaseDiagram } from "./case-diagram";
import { AvatarTile } from "./avatar-tile";

export function CaseCard({ item }: { item: UICase }) {
  return (
    <article className="case-card">
      <Link href={`/cases/${item.slug}`} aria-label={`查看案例：${item.title.zhCN}`}>
        <div className="case-card-meta">
          <span>{item.categoryLabel}</span>
          <AvatarTile dataKey={`case:${item.id}`} className="data-avatar card-data-avatar" alt="" />
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
