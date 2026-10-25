# MVP Specification

## Scope (smallest useful)

1. RPC endpoint configuration (typed).
2. RPC health + latency monitoring for a verified, user-configured endpoint.
3. Basic responsive dashboard (React + TS) showing status/latency.
4. Protocol proposal templates (RFC).
5. Launch readiness checker using explicitly documented inputs.
6. Unit + integration tests.
7. CI workflows.

## Out of scope (MVP)

- Transaction explorer (pending verified data sources).
- Real token launches/transactions.
- Desktop privileged integrations.
- AI agents.
- MCP server.

## Acceptance criteria

- `pnpm test` passes.
- `pnpm typecheck` passes.
- Health check returns `{ ok, latencyMs, status }` or a typed error.
- Readiness checker returns a structured report with pass/fail per criterion.
- Mocks are labeled `mock: true`.
