import { z } from "zod";

export const sourceCaseSchema = z.object({
  id: z.string().min(1),
  category: z.string().min(1),
  titleEN: z.string().min(1),
  summaryEN: z.string().min(1),
  promptEN: z.string().min(1),
});

export const localizedTextSchema = z.object({
  zhCN: z.string().min(1),
  sourceEN: z.string().min(1),
  aliases: z.array(z.string()).default([]),
});

export const caseVariableSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  placeholder: z.string().optional(),
});

export const uiCaseSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  categoryLabel: z.string().min(1),
  title: localizedTextSchema,
  summary: localizedTextSchema.omit({ aliases: true }),
  prompt: localizedTextSchema.omit({ aliases: true }).extend({ version: z.literal("1") }),
  thumbnail: z.string().min(1),
  tags: z.array(z.string()),
  variables: z.array(caseVariableSchema),
  outputMode: z.literal("html-preview"),
});

export type SourceCase = z.infer<typeof sourceCaseSchema>;
export type UICase = z.infer<typeof uiCaseSchema>;
export type CaseVariable = z.infer<typeof caseVariableSchema>;
