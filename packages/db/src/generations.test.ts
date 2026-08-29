import { describe, expect, it } from "vitest";
import {
  completeGeneration,
  createGeneration,
  failGeneration,
  getGeneration,
  getRecentGenerations,
} from "./generations";

process.env.TURSO_DATABASE_URL = ":memory:";

function input(id: string) {
  return {
    id,
    caseId: "minimal-single-column",
    prompt: "生成一个落地页",
    variables: { topic: "咖啡" },
    model: "mock-model",
  };
}

describe("generations 状态流转", () => {
  it("createGeneration 以 generating 状态落库，变量序列化为 JSON", async () => {
    await createGeneration(input("db-test-create"));
    const row = await getGeneration("db-test-create");
    expect(row).toBeDefined();
    expect(row?.status).toBe("generating");
    expect(row?.caseId).toBe("minimal-single-column");
    expect(JSON.parse(row?.variablesJson ?? "{}")).toEqual({ topic: "咖啡" });
    expect(row?.resultJson).toBeNull();
    expect(row?.error).toBeNull();
  });

  it("completeGeneration 流转为 ready 并记录结果、token 与耗时", async () => {
    await createGeneration(input("db-test-complete"));
    await completeGeneration(
      "db-test-complete",
      { html: "<h1>你好</h1>" },
      { inputTokens: 12, outputTokens: 34 },
      567,
    );
    const row = await getGeneration("db-test-complete");
    expect(row?.status).toBe("ready");
    expect(JSON.parse(row?.resultJson ?? "{}")).toEqual({ html: "<h1>你好</h1>" });
    expect(row?.inputTokens).toBe(12);
    expect(row?.outputTokens).toBe(34);
    expect(row?.durationMs).toBe(567);
    expect(row?.error).toBeNull();
  });

  it("failGeneration 流转为 failed 并记录错误信息", async () => {
    await createGeneration(input("db-test-fail"));
    await failGeneration("db-test-fail", "模型超时");
    const row = await getGeneration("db-test-fail");
    expect(row?.status).toBe("failed");
    expect(row?.error).toBe("模型超时");
    expect(row?.resultJson).toBeNull();
  });

  it("getGeneration 对未知 id 返回 undefined", async () => {
    expect(await getGeneration("db-test-missing")).toBeUndefined();
  });

  it("getRecentGenerations 按创建时间倒序并遵守 limit", async () => {
    for (const id of ["db-test-recent-1", "db-test-recent-2", "db-test-recent-3"]) {
      await createGeneration(input(id));
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
    const rows = await getRecentGenerations(2);
    expect(rows).toHaveLength(2);
    expect(rows[0].id).toBe("db-test-recent-3");
    expect(rows[1].id).toBe("db-test-recent-2");
    expect(rows[0].createdAt.getTime()).toBeGreaterThanOrEqual(rows[1].createdAt.getTime());
  });
});
