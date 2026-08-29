import { describe, expect, it } from "vitest";
import { avatarIndexForKey, createAvatarSampler } from "./avatar-random";

describe("avatarIndexForKey", () => {
  it("maps a data key to the same avatar every time", () => {
    const key = "skill:gpt-image-2-style-library";
    expect(avatarIndexForKey(key)).toBe(avatarIndexForKey(key));
    expect(avatarIndexForKey(key)).toBeGreaterThanOrEqual(0);
    expect(avatarIndexForKey(key)).toBeLessThan(100);
  });
});

describe("createAvatarSampler", () => {
  it("keeps slots stable and samples a candidate pool without replacement", () => {
    const sample = createAvatarSampler(() => 0);
    const picks = [sample("a", [1, 4, 8]), sample("b", [1, 4, 8]), sample("c", [1, 4, 8])];

    expect(new Set(picks).size).toBe(3);
    expect(picks.every((pick) => [1, 4, 8].includes(pick))).toBe(true);
    expect(sample("a", [1, 4, 8])).toBe(picks[0]);
  });
});
