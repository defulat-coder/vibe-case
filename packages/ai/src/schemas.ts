import { z } from "zod";

export const uiGenerationResultSchema = z.object({
  title: z.string().min(1).max(120),
  summary: z.string().min(1).max(500),
  html: z.string().min(100).max(120_000),
  notes: z.array(z.string().max(300)).max(8),
});

export const generateUIInputSchema = z.object({
  generationId: z.string().min(1),
  caseId: z.string().min(1),
  title: z.string().min(1).max(160),
  summary: z.string().min(1).max(800),
  prompt: z.string().min(20).max(8_000),
  variables: z.record(z.string(), z.string().max(500)).default({}),
  referenceImage: z.string().startsWith("data:image/").max(8_000_000).optional(),
});

export type UIGenerationResult = z.infer<typeof uiGenerationResultSchema>;
export type GenerateUIInput = z.infer<typeof generateUIInputSchema>;

export const runSkillCaseInputSchema = z.object({
  caseId: z.string().min(1).max(160),
  prompt: z.string().min(20).max(8_000),
});

export const skillCaseResultSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("image"), image: z.string().startsWith("data:image/"), mediaType: z.string() }),
  z.object({ kind: z.literal("text"), text: z.string().min(1).max(40_000) }),
]);

export type RunSkillCaseInput = z.infer<typeof runSkillCaseInputSchema>;
export type SkillCaseResult = z.infer<typeof skillCaseResultSchema>;
