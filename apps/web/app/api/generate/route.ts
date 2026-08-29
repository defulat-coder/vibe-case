import { createTextStreamResponse, toTextStream } from "ai";
import { completeGeneration, createGeneration, failGeneration } from "@vibe-case/db";
import { createMockResult, defaultModel, generateUIInputSchema, streamUI } from "@vibe-case/ai";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

function jsonStream(value: unknown) {
  return new ReadableStream<string>({
    start(controller) {
      controller.enqueue(JSON.stringify(value));
      controller.close();
    },
  });
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  let generationId = "";

  try {
    const input = generateUIInputSchema.parse(await request.json());
    generationId = input.generationId;
    const model = process.env.AI_MODEL ?? defaultModel;
    await createGeneration({ id: input.generationId, caseId: input.caseId, prompt: input.prompt, variables: input.variables, model });

    if (!process.env.AI_GATEWAY_API_KEY) {
      const mock = createMockResult(input);
      await completeGeneration(input.generationId, mock, {}, Date.now() - startedAt);
      return createTextStreamResponse({ stream: jsonStream(mock) });
    }

    const result = streamUI(input);
    void Promise.all([result.output, result.usage])
      .then(([output, usage]) => completeGeneration(
        input.generationId,
        output,
        { inputTokens: usage.inputTokens, outputTokens: usage.outputTokens },
        Date.now() - startedAt,
      ))
      .catch((error) => failGeneration(input.generationId, error instanceof Error ? error.message : "Unknown generation error"));

    return createTextStreamResponse({ stream: toTextStream({ stream: result.stream }) });
  } catch (error) {
    if (generationId) await failGeneration(generationId, error instanceof Error ? error.message : "Unknown generation error");
    return Response.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
