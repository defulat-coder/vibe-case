import { gateway, Output, streamText } from "ai";
import { buildUIPrompt, uiInstructions } from "./prompts";
import { generateUIInputSchema, uiGenerationResultSchema } from "./schemas";

export const defaultModel = "openai/gpt-5.6-terra";

export function streamUI(input: unknown) {
  const parsed = generateUIInputSchema.parse(input);
  const content: Array<{ type: "text"; text: string } | { type: "image"; image: string }> = [
    { type: "text", text: buildUIPrompt(parsed) },
  ];
  if (parsed.referenceImage) content.push({ type: "image", image: parsed.referenceImage });

  return streamText({
    model: gateway(process.env.AI_MODEL ?? defaultModel),
    instructions: uiInstructions,
    messages: [{ role: "user", content }],
    output: Output.object({ schema: uiGenerationResultSchema }),
    maxOutputTokens: 24_000,
  });
}
