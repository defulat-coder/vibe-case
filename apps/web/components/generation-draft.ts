import { z } from "zod";

const generationDraftSchema = z.object({
  version: z.literal(1),
  prompt: z.string().max(8_000),
  variables: z.record(z.string(), z.string().max(500)),
});

export type GenerationDraft = z.infer<typeof generationDraftSchema>;
type DraftStorage = Pick<Storage, "getItem" | "setItem">;

export function parseGenerationDraft(value: string | null) {
  if (!value) return;
  try {
    const result = generationDraftSchema.safeParse(JSON.parse(value));
    return result.success ? result.data : undefined;
  } catch {
    return;
  }
}

export function readGenerationDraft(getStorage: () => DraftStorage, key: string) {
  try {
    return { available: true as const, draft: parseGenerationDraft(getStorage().getItem(key)) };
  } catch {
    return { available: false as const, draft: undefined };
  }
}

export function writeGenerationDraft(getStorage: () => DraftStorage, key: string, draft: GenerationDraft) {
  const result = generationDraftSchema.safeParse(draft);
  if (!result.success) return false;
  try {
    getStorage().setItem(key, JSON.stringify(result.data));
    return true;
  } catch {
    return false;
  }
}
