import type { Metadata } from "next";
import { Suspense } from "react";
import { skillCategories, skills } from "@vibe-case/skills";
import { SkillExplorer } from "@/components/skill-explorer";

export const metadata: Metadata = { title: "Skills 案例集" };

export default function SkillsCollectionPage() {
  return (
    <main className="collection-page skills-page">
      <header className="collection-intro skills-intro">
        <h1>Skills</h1>
      </header>
      {/* useSearchParams 需要 Suspense 边界以保持静态预渲染 */}
      <Suspense>
        <SkillExplorer items={skills} categories={skillCategories} />
      </Suspense>
    </main>
  );
}
