import { describe, expect, it } from "vitest";
import { createAvatarSampler } from "./avatar-random";

describe("createAvatarSampler", () => {
  it("keeps slots stable and samples a candidate pool without replacement", () => {
    const sample = createAvatarSampler(() => 0);
    const picks = [sample("a", [1, 4, 8]), sample("b", [1, 4, 8]), sample("c", [1, 4, 8])];

    expect(new Set(picks).size).toBe(3);
    expect(picks.every((pick) => [1, 4, 8].includes(pick))).toBe(true);
    expect(sample("a", [1, 4, 8])).toBe(picks[0]);
  });
});
