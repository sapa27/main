# SAPA27 Production Repository

Canonical production architecture:

`Browser → Cloudflare Workers → Cloud Run (sapa27-gateway) → /api/router → Google Apps Script (GAS)`

## Production owners

- `frontend/` — browser UI/runtime. No GAS URL or secret is stored here.
- `cloud-run-gateway/` — same-origin frontend host and API gateway.
- `.github/workflows/cloud-run-gateway.yml` — single CI/CD owner for validation, canary, Cloudflare edge and production deployment.
- `.github/tests/regression.mjs` — canonical regression gate.

This clean replacement intentionally removes separate V2/Canary/migration workflows and GitHub Pages browser-to-GAS transports. Canary verification remains inside the single production workflow.

See `REPLACE_AND_DEPLOY.md` before replacing the repository.
