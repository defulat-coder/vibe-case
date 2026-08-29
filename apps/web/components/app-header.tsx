"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppHeader() {
  const pathname = usePathname();
  const onUI = pathname.startsWith("/collections/ui") || pathname.startsWith("/cases/") || pathname.startsWith("/generations/");
  const onSkills = pathname.startsWith("/collections/skills") || pathname.startsWith("/skills/");
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Vibe Case 首页">
        <strong>Vibe Case</strong>
      </Link>
      <nav aria-label="主导航">
        <Link href="/collections/ui" aria-current={onUI ? "page" : undefined}>UI 案例</Link>
        <Link href="/collections/skills" aria-current={onSkills ? "page" : undefined}>Skills</Link>
      </nav>
    </header>
  );
}
