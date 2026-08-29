import catalog from "../../../content/skills/catalog.json";
import { parsedSkillSchema, type ParsedSkill, type SkillCategory } from "./schema";

export const skills: ParsedSkill[] = parsedSkillSchema.array().parse(catalog);

const labels: Record<SkillCategory, string> = {
  image: "图片生成",
  visual: "视觉设计",
  ui: "UI 设计",
  ux: "UX 研究",
  product: "Product Design",
  motion: "Motion Design",
  video: "视频创作",
};

export const skillCategories = (Object.keys(labels) as SkillCategory[])
  .map((id) => ({ id, label: labels[id], count: skills.filter((skill) => skill.category === id).length }))
  .filter((category) => category.count > 0);

export function getSkillBySlug(slug: string) {
  return skills.find((skill) => skill.slug === slug);
}

export function getSkillCaseById(caseId: string) {
  for (const skill of skills) {
    const item = skill.cases.find((candidate) => candidate.id === caseId);
    if (item) return { skill, item };
  }
}

export function searchSkills(query = "", category = "All") {
  const normalized = query.trim().toLocaleLowerCase("zh-CN");
  return skills.filter((skill) => {
    if (category !== "All" && skill.category !== category) return false;
    if (!normalized) return true;
    return [
      skill.title.zhCN,
      skill.title.sourceEN,
      skill.summary.zhCN,
      skill.summary.sourceEN,
      ...skill.title.aliases,
      ...skill.whenToUse,
    ].join(" ").toLocaleLowerCase("zh-CN").includes(normalized);
  });
}
