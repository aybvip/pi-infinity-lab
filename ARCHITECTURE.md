# Architecture

## Monorepo layout

```
pi-infinity-lab/
  packages/
    rpc-toolkit/        # typed RPC client + health/latency
    launchpad-tools/    # readiness checker + simulation
    protocol-lab/       # RFC templates + specs
    browser-app/        # React dashboard (optional)
  docs/                # research, feasibility, threat model, MVP spec
  .github/workflows/   # CI
```

## Data flow

- `rpc-toolkit` exposes an adapter interface (`RpcAdapter`) plus a default implementation that only calls **documented/verified** endpoints. Mock adapters are clearly labeled.
- `launchpad-tools` consumes documented inputs (no on-chain scraping claims beyond documented sources).
- `browser-app` keeps server credentials on the backend; uses official Pi SDK only where appropriate.

## Boundaries

- No invented endpoints/APIs/RPC methods.
- No real token launches or transactions without explicit authorization.
- No claims of audit/safety from automated scans.
- Mock responses are labeled `mock: true`.
