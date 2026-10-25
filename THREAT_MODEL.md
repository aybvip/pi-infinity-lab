# Threat Model

## Assets
- Endpoint credentials (must remain server-side).
- User data in browser-app.
- Integrity of displayed on-chain data.

## Threats
- Credential leakage via client bundle.
- Mislabeling mock data as verified on-chain data.
- SSRF via RPC client (mitigated: explicit endpoint config, no arbitrary URLs from user input without validation).
- Supply-chain (dependencies) — mitigated via lockfile + maintained deps.
- Misleading safety claims.

## Mitigations
- Strict TypeScript, input validation (zod) at boundaries.
- Label mock responses.
- No automatic mainnet transactions.
- Clear disclaimers.
