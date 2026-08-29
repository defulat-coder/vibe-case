import type { Metadata } from "next";
import { skillCategories, skills } from "@vibe-case/skills";
import { SkillExplorer } from "@/components/skill-explorer";

export const metadata: Metadata = { title: "Skills 案例集" };

export default function SkillsCollectionPage() {
  const caseCount = skills.reduce((total, skill) => total + skill.cases.length, 0);
  return (
    <main className="collection-page skills-page">
      <header className="collection-intro skills-intro">
        <div><h1>把好玩的 Skill，<br />变成能运行的案例。</h1><p>持续探索独立作者与小型开源项目，自动解析 SKILL.md，转换成中文用途、工作流和案例。解析成功后立即可用，没有审核发布流程。</p></div>
        <dl className="collection-summary">
          <div><dt>Skills</dt><dd>{skills.length}</dd></div>
          <div><dt>案例</dt><dd>{caseCount}</dd></div>
          <div><dt>更新</dt><dd>Auto Sync</dd></div>
        </dl>
      </header>
      <SkillExplorer items={skills} categories={skillCategories} />
    </main>
  );
}
