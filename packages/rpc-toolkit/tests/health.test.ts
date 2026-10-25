import { describe, it, expect } from "vitest";
import { validateConfig } from "../src/config.js";
import { checkHealth } from "../src/health.js";

describe("rpc-toolkit health", () => {
  it("labels mock responses", async () => {
    const cfg = validateConfig({ name: "mock", baseUrl: "https://example.test", mock: true });
    const r = await checkHealth(cfg);
    expect(r.ok).toBe(true);
    expect(r.mock).toBe(true);
    expect(r.latencyMs).toBe(0);
  });

  it("reports failure on non-ok", async () => {
    const cfg = validateConfig({ name: "t", baseUrl: "https://example.test" });
    const fetchImpl = async () => ({ ok: false, status: 503, statusText: "Unavailable", text: async () => "" }) as any;
    const r = await checkHealth(cfg, "/", fetchImpl);
    expect(r.ok).toBe(false);
  });
});
