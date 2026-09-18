# sapa27 Cloud Run Production Service

CR-4 makes Cloud Run the single production web surface:

`Browser -> Cloud Run (frontend + API) -> Google Apps Script`

The previous GitHub Pages URL is no longer the production entry point. The `github-pages/` directory remains only as the canonical frontend source that is bundled into the Cloud Run image during deployment.

## Production URL

`https://sapa27-gateway-asxuzzwspa-eu.a.run.app/`

## Endpoints

- `GET /` — production frontend
- `GET /ready` — readiness plus bundled-frontend marker
- `GET /version` — gateway/RPC version
- `GET /health` — live Cloud Run -> GAS RPC health
- `POST /api/router` — canonical API entry point

Browser login, session, reads, and writes all use Cloud Run. The browser no longer requires direct access to `script.google.com`.

## Deployment

Service: `sapa27-gateway`  
Region: `asia-southeast3`  
CPU: 1 vCPU  
Memory: 512 MiB  
Concurrency: 40  
Min instances: 0  
Max instances: 5

The GitHub workflow stages `github-pages/` into `cloud-run-gateway/public/`, validates the gateway, deploys the unified service, and smoke-tests the frontend, configuration, transport, readiness, and GAS health.

The gateway continues to read the canonical GAS `/exec` URL and RPC version from `github-pages/app-config.js` during deployment. Workload Identity Federation is used instead of a long-lived service-account key.

## CR-5 Mobile / Meeting reliability

CR-5 keeps Cloud Run as the only production web surface and optimizes the Meeting route for narrow/mobile screens.

- Meeting fragments use the normal authenticated GAS deferred cache path instead of forcing a fresh include on every navigation.
- Meeting controller loading no longer waits for Bootstrap asset warming.
- Initial navigation does not invalidate Meeting fragments before they have ever loaded.
- Meeting-specific script/activation budgets are 80s/95s as a recovery ceiling, while normal routes retain the existing budgets.
- Mobile Meeting tabs scroll horizontally, forms use touch-friendly 16px controls, action buttons wrap cleanly, and tables remain horizontally scrollable instead of compressing columns.
- GitHub Pages deployment is removed; its directory is source-only and is packaged into Cloud Run.
- Deferred includes are not cached across users at the gateway; GAS remains the authorization boundary for every include request.

