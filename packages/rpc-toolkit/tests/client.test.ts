import { describe, it, expect } from "vitest";
import { createRpcClient, validateConfig } from "../src/index.js";

describe("rpc-toolkit client", () => {
  it("returns ok data on 200", async () => {
    const cfg = validateConfig({ name: "t", baseUrl: "https://example.test", timeoutMs: 1000 });
    const client = createRpcClient(cfg, async () =>
      ({ ok: true, status: 200, statusText: "OK", json: async () => ({ hello: "world" }) }) as any
    );
    const r = await client.request("/ping");
    expect(r.ok).toBe(true);
    expect(r.data).toEqual({ hello: "world" });
    expect(typeof r.latencyMs).toBe("number");
  });

  it("returns error on non-2xx", async () => {
    const cfg = validateConfig({ name: "t", baseUrl: "https://example.test", timeoutMs: 1000 });
    const client = createRpcClient(cfg, async () =>
      ({ ok: false, status: 500, statusText: "ISE", text: async () => "boom" }) as any
    );
    const r = await client.request("/x");
    expect(r.ok).toBe(false);
    expect(r.error).toContain("500");
    expect(r.error).toContain("boom");
  });

  it("handles timeout", async () => {
    const cfg = validateConfig({ name: "t", baseUrl: "https://example.test", timeoutMs: 20 });
    const client = createRpcClient(cfg, async (_u: any, init: any) =>
      new Promise((_res, rej) => {
        init?.signal?.addEventListener("abort", () => rej(Object.assign(new Error("aborted"), { name: "AbortError" })));
      }) as any
    );
    const r = await client.request("/slow");
    expect(r.ok).toBe(false);
    expect(r.error).toContain("timeout");
  });

  it("rejects invalid config", () => {
    expect(() => validateConfig({ name: "", baseUrl: "not-a-url" })).toThrow();
  });
});
