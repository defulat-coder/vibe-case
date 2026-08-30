import { z } from "zod";

export const skillCategorySchema = z.enum(["image", "visual", "ui", "ux", "product", "motion", "video"]);
export const skillExecutionModeSchema = z.enum(["image", "prompt", "structured", "timeline-plan"]);

export const skillCaseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  input: z.string().min(1),
  prompt: z.string().min(1),
  output: z.string().min(1),
  executionMode: skillExecutionModeSchema,
});

export const skillSourceSchema = z.object({
  repository: z.string().min(3),
  skillPath: z.string().min(1),
  githubUrl: z.string().url(),
  skillsShUrl: z.string().url(),
  license: z.string().min(1),
  commit: z.string(),
  installs: z.number().int().nonnegative(),
  contentHash: z.string(),
});

export const parsedSkillSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  status: z.literal("active"),
  category: skillCategorySchema,
  categoryLabel: z.string().min(1),
  title: z.object({
    zhCN: z.string().min(1),
    sourceEN: z.string().min(1),
    aliases: z.array(z.string()),
  }),
  summary: z.object({ zhCN: z.string().min(1), sourceEN: z.string().min(1) }),
  content: z.object({
    sourceEN: z.string().min(1),
    zhCN: z.string().min(1),
  }),
  whenToUse: z.array(z.string()).min(1),
  workflow: z.array(z.string()).min(1),
  outputs: z.array(z.string()).min(1),
  dependencies: z.array(z.string()),
  riskNotes: z.array(z.string()),
  cases: z.array(skillCaseSchema).min(1),
  source: skillSourceSchema,
});

export const skillSourceConfigSchema = z.object({
  repository: z.string().min(3),
  skillId: z.string().min(1),
  skillPath: z.string().min(1),
  skillsShUrl: z.string().url(),
});

export const discoveryConfigSchema = z.object({
  queries: z.array(z.string().min(1)),
  maxNewPerRun: z.number().int().min(0).max(20),
  excludedOwners: z.array(z.string()),
  excludedTerms: z.array(z.string()),
  excludedSources: z.array(z.string()).default([]),
  sources: z.array(skillSourceConfigSchema),
});

export type ParsedSkill = z.infer<typeof parsedSkillSchema>;
export type SkillCase = z.infer<typeof skillCaseSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
export type SkillExecutionMode = z.infer<typeof skillExecutionModeSchema>;
export type SkillSourceConfig = z.infer<typeof skillSourceConfigSchema>;
