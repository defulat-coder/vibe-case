import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AvatarTile } from "./avatar-tile";

export function AppHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Vibe Case 首页">
        <AvatarTile index={4} className="wordmark-avatar" alt="" priority />
        <strong>Vibe Case</strong>
      </Link>
      <nav aria-label="主导航">
        <Link href="/collections/ui">UI 案例库</Link>
        <a href="https://vibeui.online/" target="_blank" rel="noreferrer">
          参考来源 <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
