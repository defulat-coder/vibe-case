import { createClient } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import { dirname, resolve } from "node:path";
import { mkdirSync } from "node:fs";
import * as schema from "./schema";

let database: LibSQLDatabase<typeof schema> | undefined;
let initialization: Promise<LibSQLDatabase<typeof schema>> | undefined;

async function initialize() {
  const url = process.env.TURSO_DATABASE_URL || "file:.data/vibe-case.db";
  if (url.startsWith("file:")) {
    mkdirSync(dirname(resolve(url.slice("file:".length))), { recursive: true });
  }

  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN || undefined,
  });
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS generations (
      id TEXT PRIMARY KEY,
      case_id TEXT NOT NULL,
      status TEXT NOT NULL,
      prompt TEXT NOT NULL,
      variables_json TEXT NOT NULL,
      model TEXT NOT NULL,
      result_json TEXT,
      error TEXT,
      input_tokens INTEGER,
      output_tokens INTEGER,
      duration_ms INTEGER,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )
  `);

  database = drizzle(client, { schema });
  return database;
}

export function getDb() {
  if (database) return Promise.resolve(database);
  initialization ??= initialize();
  return initialization;
}
