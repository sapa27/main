# sapa27 Cloud Run Production Service

Production architecture:

`Browser -> Cloud Run -> GAS Direct JSON`

GitHub Actions is CI/CD only: it validates, builds, deploys and smoke-tests Cloud Run. GitHub Pages and Vercel are not production runtimes for this project.

## CR-8 GAS Canonical Response

- Canonical frontend source: `frontend/`
- Production runtime: Cloud Run service `sapa27-gateway`
- Browser API path: same-origin `/api/router`
- Cloud Run to GAS: server-to-server JSON POST
- GAS owns the application response envelope: `gas-direct-json-v1`
- Success envelope: `{"transportOk":true,"result":...}`
- Failure envelope: `{"transportOk":false,"error":{...}}`
- Cloud Run validates the GAS envelope and passes it through without business-response re-wrapping.
- Gateway diagnostics such as request id and upstream duration are returned as HTTP headers.
- Browser has no GAS URL, JSONP, iframe bridge, GitHub Pages transport, or direct browser-to-GAS fallback.
- `/upstream-health` is a fail-closed live GAS contract probe used before promotion.
- `APP_SOURCE_SHA` must be present in Canary and Production and must match the deployed Git commit.

Deployment gate: Canary -> live GAS contract -> source SHA -> Production -> final smoke.
