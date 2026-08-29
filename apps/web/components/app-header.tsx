"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { AvatarTile } from "./avatar-tile";

export function AppHeader() {
  const pathname = usePathname();
  const onUI = pathname.startsWith("/collections/ui") || pathname.startsWith("/cases/") || pathname.startsWith("/generations/");
  const onSkills = pathname.startsWith("/collections/skills") || pathname.startsWith("/skills/");
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Vibe Case 首页">
        <AvatarTile index={4} className="wordmark-avatar" alt="" priority randomKey="site-header" candidateIndices={[0, 1, 4]} />
        <strong>Vibe Case</strong>
      </Link>
      <nav aria-label="主导航">
        <Link href="/collections/ui" aria-current={onUI ? "page" : undefined}>UI 案例库</Link>
        <Link href="/collections/skills" aria-current={onSkills ? "page" : undefined}>Skills 案例集</Link>
        <a href="https://vibeui.online/" target="_blank" rel="noreferrer">
          参考来源 <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
