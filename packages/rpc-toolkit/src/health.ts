import type { RpcEndpointConfig, HealthResult } from "./types.js";
import { createRpcClient } from "./client.js";

export async function checkHealth(cfg: RpcEndpointConfig, path = "/", fetchImpl?: typeof fetch): Promise<HealthResult> {
  if (cfg.mock) {
    return { ok: true, status: 200, latencyMs: 0, endpoint: cfg.baseUrl, mock: true };
  }
  const client = createRpcClient(cfg, fetchImpl);
  const r = await client.request(path);
  return {
    ok: r.ok,
    status: r.ok ? 200 : null,
    latencyMs: r.latencyMs,
    endpoint: cfg.baseUrl,
    mock: false,
  };
}
