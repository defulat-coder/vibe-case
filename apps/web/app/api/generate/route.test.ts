import { describe, expect, it } from "vitest";

process.env.TURSO_DATABASE_URL = ":memory:";
delete process.env.AI_GATEWAY_API_KEY;

import { getGeneration } from "@vibe-case/db";
import { POST } from "./route";

function request(body: unknown) {
  return new Request("http://localhost/api/generate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validInput = {
  generationId: "route-test-gen-1",
  caseId: "auth-3",
  title: "极简单列",
  summary: "单列内容结构",
  prompt: "生成一个极简单列布局的介绍页面，包含标题与段落。",
  variables: {},
};

describe("POST /api/generate", () => {
  it("未知 caseId 返回 404", async () => {
    const res = await POST(request({ ...validInput, caseId: "no-such-case" }));
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "案例不存在或已下线" });
  });

  it("非法请求体返回 400", async () => {
    const res = await POST(request({ ...validInput, prompt: "太短" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(typeof body.error).toBe("string");
  });

  it("无 API key 时返回 mock 流并将生成记录流转为 ready", async () => {
    const res = await POST(request(validInput));
    expect(res.status).toBe(200);
    const text = await res.text();
    const mock = JSON.parse(text);
    expect(typeof mock.html).toBe("string");
    const row = await getGeneration("route-test-gen-1");
    expect(row?.status).toBe("ready");
    expect(JSON.parse(row?.resultJson ?? "{}").html).toBe(mock.html);
  });
});
