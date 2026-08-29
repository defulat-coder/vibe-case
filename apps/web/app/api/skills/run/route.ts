import { getSkillCaseById } from "@vibe-case/skills";
import { runSkillCase, runSkillCaseInputSchema, skillCaseResultSchema } from "@vibe-case/ai";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const input = runSkillCaseInputSchema.parse(await request.json());
    const found = getSkillCaseById(input.caseId);
    if (!found) return Response.json({ error: "案例不存在或已下线" }, { status: 404 });

    if (!process.env.AI_GATEWAY_API_KEY) {
      return Response.json({
        kind: "text",
        text: `本地演示结果\n\n已按「${found.skill.title.zhCN}」接收案例：${found.item.title}。\n\n配置 AI_GATEWAY_API_KEY 后，这里会返回真实的${found.item.executionMode === "image" ? " GPT Image 2 图片" : "结构化结果"}。`,
      });
    }

    return Response.json(skillCaseResultSchema.parse(await runSkillCase(found.item.executionMode, input.prompt)));
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "运行案例失败" }, { status: 400 });
  }
}
