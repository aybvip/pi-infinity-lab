import { z } from "zod";
import type { RpcEndpointConfig } from "./types.js";

export const EndpointConfigSchema = z.object({
  name: z.string().min(1),
  baseUrl: z.string().url(),
  timeoutMs: z.number().int().positive().max(60000).optional(),
  headers: z.record(z.string()).optional(),
  mock: z.boolean().optional(),
});

export function validateConfig(cfg: unknown): RpcEndpointConfig {
  const parsed = EndpointConfigSchema.parse(cfg);
  return {
    name: parsed.name,
    baseUrl: parsed.baseUrl.replace(/\/+$/, ""),
    timeoutMs: parsed.timeoutMs ?? 10000,
    headers: parsed.headers,
    mock: parsed.mock ?? false,
  };
}
