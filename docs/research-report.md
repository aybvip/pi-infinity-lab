# Research Report

## Official sources investigated

- https://minepi.com/developers/
- https://developers.minepi.com/docs/build-first-app/GettingStarted
- https://developers.minepi.com/docs/api-reference/SdkReference
- https://minepi.com/blog/pi-launchpad/
- https://minepi.com/blog/solohost-pi-desktop-0-6-4/
- https://minepi.com/blog/pi2day2026/

## Findings (MVP-relevant)

- Pi Platform API and SDK exist for app authentication/payment flows (U2A).
- Pi Launchpad is a separate, published design; this project will NOT build a competing launch mechanism initially.
- Pi Desktop / SoloHost capabilities are documented in blog posts; privileged interfaces require official source access.
- Public RPC endpoints for Pi blockchain are not uniformly documented; an adapter + mock approach is used until verified.

## Conclusion

The MVP focuses on RPC health/latency for a **verified, user-configured endpoint** and a launch readiness checker using **explicitly documented inputs**. No invented endpoints.
