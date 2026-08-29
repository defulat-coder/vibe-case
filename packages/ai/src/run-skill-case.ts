import { gateway, generateImage, generateText } from "ai";

type SkillExecutionMode = "image" | "prompt" | "structured" | "timeline-plan";

const skillInstructions: Record<Exclude<SkillExecutionMode, "image">, string> = {
  prompt: "输出一份可直接复制使用的最终 Prompt，并简要说明关键结构。使用自然中文，保留必要的英文专有名词。",
  structured: "严格根据用户给出的 Skill 方法完成任务。使用清晰的 Markdown 标题、列表和表格；结论必须具体、可执行。",
  "timeline-plan": "输出可执行的时间线计划。保留 BPM、FPS、Frame、Cut、J-cut、L-cut 等专业术语，并给出可核对的时间码或帧号。",
};

export async function runSkillCase(executionMode: SkillExecutionMode, prompt: string) {
  if (executionMode === "image") {
    const { image } = await generateImage({
      model: gateway.image(process.env.IMAGE_MODEL ?? "openai/gpt-image-2"),
      prompt,
      size: "1024x1024",
      abortSignal: AbortSignal.timeout(110_000),
    });
    return { kind: "image" as const, image: `data:${image.mediaType};base64,${image.base64}`, mediaType: image.mediaType };
  }

  const { text } = await generateText({
    model: gateway(process.env.AI_MODEL ?? "openai/gpt-5.6-terra"),
    instructions: skillInstructions[executionMode],
    prompt,
    maxOutputTokens: 8_000,
    abortSignal: AbortSignal.timeout(110_000),
  });
  return { kind: "text" as const, text };
}
