# Feasibility Matrix

| Capability | Status | Notes |
|---|---|---|
| Typed RPC client | Feasible | Adapter pattern; endpoint user-configured |
| Endpoint health checks | Feasible | HTTP-level; method-level requires verification |
| Retry policies | Feasible | Only idempotent reads |
| Transaction inspection | Pending verification | Requires documented data source |
| Launch readiness checker | Feasible | Uses documented inputs only |
| Browser dashboard | Feasible | React + TS |
| Pi Desktop diagnostics | Independent tools only | No privileged access |
| SoloHost integration | Not yet verified | Adapter + mock |
| AI agents | Optional, scoped | No unrestricted shell/fs |
| Consensus improvements | Not claimed | Requires measured evidence |

Statuses: Feasible / Pending verification / Not yet verified / Not claimed.
