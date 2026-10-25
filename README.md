# PI INFINITY LAB

> Independent, open-source infrastructure R&D for the Pi Network ecosystem.
> **Not affiliated with, endorsed by, or maintained by Pi Network.**

## Status

Early-stage MVP. Research-first. See `docs/feasibility-matrix.md` and `docs/mvp-spec.md`.

## What this is

A TypeScript monorepo exploring developer tooling around the Pi ecosystem:
- `packages/rpc-toolkit` — typed RPC client, health/latency checks, error normalization.
- `packages/launchpad-tools` — project readiness checker and launch simulation (documented inputs only).
- `packages/protocol-lab` — RFC templates and protocol specs.
- `packages/browser-app` — optional dashboard (React + TS).

## What this is NOT

- Not an official Pi product.
- Not an audited security tool.
- Not a token launch platform (no real launches executed).
- Not a claim of consensus/network improvements without measured evidence.

## Quick start

```bash
pnpm install
pnpm test
pnpm --filter @pi-infinity/rpc-toolkit test
```

## Principles

See the project spec: research before implementation, honest labeling of mocks, MVP-first, engineering quality, governance docs.

## License

MIT.
