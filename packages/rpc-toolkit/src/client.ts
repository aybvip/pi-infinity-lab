import type { RpcEndpointConfig, RpcResult } from "./types.js";

export interface RpcClient {
  request<T = unknown>(path: string, init?: RequestInit): Promise<RpcResult<T>>;
}

export function createRpcClient(cfg: RpcEndpointConfig, fetchImpl: typeof fetch = fetch): RpcClient {
  const timeoutMs = cfg.timeoutMs ?? 10000;
  return {
    async request<T = unknown>(path: string, init?: RequestInit): Promise<RpcResult<T>> {
      const url = `${cfg.baseUrl}${path.startsWith("/") ? path : "/" + path}`;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      const start = Date.now();
      try {
        const res = await fetchImpl(url, {
          ...init,
          headers: { Accept: "application/json", ...(cfg.headers ?? {}), ...(init?.headers ?? {}) },
          signal: controller.signal,
        });
        const latencyMs = Date.now() - start;
        if (!res.ok) {
          let body = "";
          try { body = await res.text(); } catch { /* ignore */ }
          return { ok: false, error: `${res.status} ${res.statusText}${body ? ": " + body.slice(0, 200) : ""}`, latencyMs };
        }
        const data = (await res.json()) as T;
        return { ok: true, data, latencyMs };
      } catch (err) {
        const latencyMs = Date.now() - start;
        const msg = err instanceof Error ? err.message : String(err);
        const aborted = /abort/i.test(msg);
        return { ok: false, error: aborted ? `timeout after ${timeoutMs}ms` : `network error: ${msg}`, latencyMs };
      } finally {
        clearTimeout(timer);
      }
    },
  };
}
