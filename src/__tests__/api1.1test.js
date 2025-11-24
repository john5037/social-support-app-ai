// src/__tests__/api.test.js
import { describe, it, expect, vi, afterEach } from "vitest";
import { fetchWithBackoff } from "../utils/api";

// 1. Use fake timers for the entire suite
vi.useFakeTimers();

// Helper to advance timers and ensure the promise microtasks resolve, 
// allowing the for-loop in fetchWithBackoff to continue.
async function flushPromises() {
  await vi.runOnlyPendingTimersAsync();
  // CRITICAL: This flushes the microtask queue after setTimeout resolves, 
  // ensuring the async for-loop continues.
  await Promise.resolve(); 
}

describe("fetchWithBackoff", () => {
  const originalFetch = global.fetch;

  // Mock Math.random to ensure predictable backoff delays (0.1 is used as a fixed offset)
  const randomMock = vi.spyOn(global.Math, 'random').mockReturnValue(0.1);

  afterEach(() => {
    global.fetch = originalFetch;
    // Restore all mocks, including Math.random
    vi.restoreAllMocks(); 
  });

  it("retries on failures and returns data when succeeds", async () => {
    const mockJson = { ok: true, data: "done" };
    const failing = vi.fn()
      .mockRejectedValueOnce(new Error("Network error")) // Attempt 1 fails
      .mockRejectedValueOnce(new Error("Network error")) // Attempt 2 fails
      .mockResolvedValue({ // Attempt 3 succeeds
        ok: true,
        json: async () => mockJson,
      });

    global.fetch = failing;
    const maxRetries = 3;

    const promise = fetchWithBackoff("https://example.com", { method: "GET" }, maxRetries);

    // 1. Resolve first retry timer (allows 2nd attempt to fire)
    await flushPromises(); 
    
    // 2. Resolve second retry timer (allows 3rd attempt to fire, which succeeds)
    await flushPromises(); 

    // Now, await the successful result
    const res = await promise; 

    expect(res).toEqual(mockJson);
    // Should be 3 calls (initial + 2 retries)
    expect(failing).toHaveBeenCalledTimes(maxRetries); 
  });

  it("throws after all retries fail", async () => {
    const alwaysFail = vi.fn()
      .mockRejectedValueOnce(new Error("No service")) // Attempt 1
      .mockRejectedValueOnce(new Error("No service")); // Attempt 2
      
    global.fetch = alwaysFail;
    const maxRetries = 2; 

    const promise = fetchWithBackoff("https://example.com", {}, maxRetries);

    // 1. Resolve first (and only) retry timer (allows 2nd attempt to fire)
    await flushPromises(); 

    // Now, await the rejection (which happens after the 2nd attempt fails and the loop exits)
    await expect(promise).rejects.toThrow("Failed to communicate with AI service after multiple retries.");
    
    // The second call (Attempt 2) must have happened for the promise to throw the final error.
    expect(alwaysFail).toHaveBeenCalledTimes(maxRetries);
  });
});