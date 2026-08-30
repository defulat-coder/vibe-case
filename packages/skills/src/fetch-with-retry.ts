import { setTimeout as delay } from "node:timers/promises";

const retryableStatuses = new Set([408, 429, 500, 502, 503, 504]);

export async function fetchWithRetry(url: string, init?: RequestInit, attempts = 3, delayMs = 250) {
  let response: Response | undefined;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      response = await fetch(url, init);
      if (response.ok || !retryableStatuses.has(response.status)) return response;
    } catch (error) {
      if (attempt === attempts - 1) throw error;
    }
    if (attempt < attempts - 1) await delay(delayMs * 2 ** attempt);
  }
  return response!;
}
