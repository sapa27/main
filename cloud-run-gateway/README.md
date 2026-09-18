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

## CR-8.3 Meeting Runtime Ownership

- Meeting UI/controller code is a static Cloud Run asset: `frontend/meeting-controller.html`.
- The Meeting route no longer calls GAS `getDeferredInclude` to obtain `meeting-common` or `meeting` controller code.
- GAS remains the data/API owner through `/api/router`; no business data logic is moved into Cloud Run.
- The first Meeting lifecycle mount is canonicalized and forced to avoid the mobile Vue visibility race.
- Canary and Production smoke tests require the static Meeting controller markers before a deployment is accepted.
- Live GAS upstream health remains fail-closed, with three bounded attempts to tolerate a single transient 504 without soft-passing a broken upstream.

## CR-8.4 Meeting Static-First

- The Meeting controller is executed from the Cloud Run static asset immediately after Core Runtime is ready.
- Shared Date/Table deferred assets are warmed in the background and cannot block controller registration or first route activation.
- Shared-runtime warmup failures are recorded as degraded support assets; they do not recreate the controller-not-found failure.
- Meeting data remains server-driven through Cloud Run -> GAS Direct JSON.
