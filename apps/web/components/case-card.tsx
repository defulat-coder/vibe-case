import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { UICase } from "@vibe-case/cases";
import { CaseDiagram } from "./case-diagram";
import { AvatarTile } from "./avatar-tile";

export function CaseCard({ item, index }: { item: UICase; index: number }) {
  return (
    <article className="case-card">
      <Link href={`/cases/${item.slug}`} aria-label={`查看案例：${item.title.zhCN}`}>
        <div className="case-card-meta">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{item.categoryLabel}</span>
        </div>
        <div className="case-card-visual">
          <CaseDiagram id={item.id} category={item.category} label={item.title.zhCN} />
          <AvatarTile index={index} className="case-card-guide" alt="" />
        </div>
        <div className="case-card-copy">
          <h3>{item.title.zhCN}</h3>
          <p>{item.summary.zhCN}</p>
          <span className="case-card-english">{item.title.sourceEN}</span>
        </div>
        <ArrowUpRight className="case-card-arrow" size={18} aria-hidden="true" />
      </Link>
    </article>
  );
}
