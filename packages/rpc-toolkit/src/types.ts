export interface RpcEndpointConfig {
  /** Human-readable label. */
  name: string;
  /** Base URL of the endpoint. Must be a verified/documented endpoint. */
  baseUrl: string;
  /** Optional request timeout in ms. Default 10000. */
  timeoutMs?: number;
  /** Optional headers (e.g. auth) — keep secrets server-side. */
  headers?: Record<string, string>;
  /** If true, responses are mock (labelled). */
  mock?: boolean;
}

export interface RpcResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
  latencyMs: number;
}

export interface HealthResult {
  ok: boolean;
  status: number | null;
  latencyMs: number;
  endpoint: string;
  mock: boolean;
}
