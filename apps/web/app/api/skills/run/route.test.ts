import { describe, expect, it } from "vitest";

delete process.env.AI_GATEWAY_API_KEY;

import { POST } from "./route";

function request(body: unknown) {
  return new Request("http://localhost/api/skills/run", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validInput = {
  caseId: "style-library-city-map",
  prompt: "按照技能要求生成一张城市地图风格的海报描述。",
};

describe("POST /api/skills/run", () => {
  it("未知 caseId 返回 404", async () => {
    const res = await POST(request({ ...validInput, caseId: "no-such-skill-case" }));
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "案例不存在或已下线" });
  });

  it("非法请求体返回 400", async () => {
    const res = await POST(request({ caseId: "style-library-city-map" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(typeof body.error).toBe("string");
  });

  it("无 API key 时返回本地演示文本结果", async () => {
    const res = await POST(request(validInput));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.kind).toBe("text");
    expect(body.text).toContain("本地演示结果");
  });
});
