# P0-E Cloudflare Worker Gateway

Canonical gateway for `sapa27/main` mobile/production transport.

## Required Cloudflare secret

- `GAS_WEB_APP_URL` — canonical GAS `/exec` URL. Do not hard-code it in Worker source.

## GitHub Actions secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `GAS_WEB_APP_URL`

Run **Deploy Cloudflare P0-E Gateway** manually. The workflow deploys the Worker, then validates gateway health and a real `apiSessionCheck` RPC round trip through Cloudflare.

After the workflow succeeds, set the deployed Worker URL in `github-pages/app-config.js` as `GATEWAY_URL`, set `GATEWAY_REQUIRED_ON_MOBILE=true`, run Pages regression, deploy Pages, and verify mobile network traffic has no direct RPC request to `script.google.com`.

For business-critical production, attach a Cloudflare Custom Domain and use that URL instead of relying permanently on `workers.dev`.
