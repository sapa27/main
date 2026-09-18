# sapa27 Cloud Run Gateway

CR-1 prepares the new transport path:

`GitHub Pages -> Cloud Run -> Google Apps Script`

The production frontend remains at `https://sapa27.github.io/main/` until live gateway smoke tests pass.

## Endpoints

- `GET /ready` — process/readiness plus upstream configuration marker
- `GET /version` — gateway and RPC version
- `GET /health` — live Cloud Run -> GAS RPC health check
- `POST /api/router` — canonical JSON API entry point

The allowed browser origin defaults to `https://sapa27.github.io`.

## Initial Cloud Run target

- Service: `sapa27-gateway`
- Region: `asia-southeast3` (Bangkok)
- CPU: 1 vCPU
- Memory: 512 MiB
- Concurrency: 40
- Min instances: 0
- Max instances: 5

## GitHub deployment variables

Configure repository variables `GCP_PROJECT_ID`, `GCP_REGION`, `CLOUD_RUN_SERVICE`, `GCP_WIF_PROVIDER`, and `GCP_SERVICE_ACCOUNT`.

The workflow reads the canonical GAS `/exec` URL and RPC version from `github-pages/app-config.js`; it does not maintain a second production endpoint.

Use Workload Identity Federation rather than a long-lived service-account JSON key.

For browser access, grant `roles/run.invoker` to `allUsers` once during Cloud Run bootstrap and let later deployments preserve that IAM policy. CR-1 does not switch the frontend to Cloud Run; direct GAS remains the rollback path until authenticated read/write smoke tests pass.
