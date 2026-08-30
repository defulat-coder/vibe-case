import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchWithRetry } from "./fetch-with-retry";

describe("fetchWithRetry", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("retries a transient network failure", async () => {
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new TypeError("fetch failed"))
      .mockResolvedValueOnce(new Response("ok"));
    vi.stubGlobal("fetch", fetchMock);

    const response = await fetchWithRetry("https://example.com", undefined, 2, 0);

    expect(await response.text()).toBe("ok");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
