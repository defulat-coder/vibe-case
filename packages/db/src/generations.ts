import { desc, eq } from "drizzle-orm";
import { getDb } from "./client";
import { generations } from "./schema";

export async function createGeneration(input: {
  id: string;
  caseId: string;
  prompt: string;
  variables: Record<string, string>;
  model: string;
}) {
  const now = new Date();
  const db = await getDb();
  await db.insert(generations).values({
    id: input.id,
    caseId: input.caseId,
    status: "generating",
    prompt: input.prompt,
    variablesJson: JSON.stringify(input.variables),
    model: input.model,
    createdAt: now,
    updatedAt: now,
  });
}

export async function completeGeneration(
  id: string,
  result: unknown,
  usage: { inputTokens?: number; outputTokens?: number },
  durationMs: number,
) {
  const db = await getDb();
  await db
    .update(generations)
    .set({
      status: "ready",
      resultJson: JSON.stringify(result),
      inputTokens: usage.inputTokens,
      outputTokens: usage.outputTokens,
      durationMs,
      updatedAt: new Date(),
    })
    .where(eq(generations.id, id));
}

export async function failGeneration(id: string, error: string) {
  const db = await getDb();
  await db
    .update(generations)
    .set({ status: "failed", error, updatedAt: new Date() })
    .where(eq(generations.id, id));
}

export async function getGeneration(id: string) {
  const db = await getDb();
  return db.query.generations.findFirst({ where: eq(generations.id, id) });
}

export async function getRecentGenerations(limit = 8) {
  const db = await getDb();
  return db.select().from(generations).orderBy(desc(generations.createdAt)).limit(limit);
}
