import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const generations = sqliteTable("generations", {
  id: text("id").primaryKey(),
  caseId: text("case_id").notNull(),
  status: text("status", { enum: ["generating", "ready", "failed"] }).notNull(),
  prompt: text("prompt").notNull(),
  variablesJson: text("variables_json").notNull(),
  model: text("model").notNull(),
  resultJson: text("result_json"),
  error: text("error"),
  inputTokens: integer("input_tokens"),
  outputTokens: integer("output_tokens"),
  durationMs: integer("duration_ms"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export type Generation = typeof generations.$inferSelect;
