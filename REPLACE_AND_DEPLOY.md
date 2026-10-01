# Replace the existing GitHub repository with this clean production tree

Target repository: `sapa27/main`

## 1. Configure repository variables before deployment

Set these under **Settings → Secrets and variables → Actions → Variables**:

- `GAS_WEB_APP_URL` = `https://script.google.com/macros/s/AKfycbywnjfJ2z3PCCf_-Lcm0V0Pa_PgL0RLeYgoLZ09v2-RkFlif9xcGCFJXsts-7DwsN9C/exec`
- `ANTI_GAS_WEB_APP_URL` = existing Anti public GAS `/exec` URL, if that isolated public endpoint is still enabled
- `GCP_PROJECT_ID` = `sapa27`
- `GCP_REGION` = `asia-southeast3`
- `CLOUD_RUN_SERVICE` = `sapa27-gateway`
- `GCP_WIF_PROVIDER` = current Workload Identity Provider resource
- `GCP_SERVICE_ACCOUNT` = current GitHub deployer service account
- `CLOUD_RUN_ORIGIN` = current `sapa27-gateway` `run.app` origin
- `PUBLIC_APP_ORIGIN` = `https://sapa27.anti27.workers.dev`
- `CF_WORKER_NAME` = `sapa27`
- `CF_WORKERS_SUBDOMAIN` = `anti27`
- `CLOUDFLARE_ACCOUNT_ID` = current Cloudflare account id

Keep these as **GitHub Secrets**, not repository files:

- `CLOUDFLARE_API_TOKEN`
- `E2E_SMOKE_USERNAME`
- `E2E_SMOKE_PASSWORD`

Do not store OpenAI API keys, passwords, GAS credentials, or Cloudflare tokens in this repository.

## 2. Replace all tracked files

Recommended Git procedure:

```bash
git clone https://github.com/sapa27/main.git
cd main
git checkout main
git pull --ff-only

# Optional safety backup before replacement
git branch backup-before-clean-replacement

# Remove old tracked/untracked repository content, but keep .git
git rm -r .
git clean -fdx

# Copy every file/folder from this ZIP into the repository root.
git add .
git status
git commit -m "Replace repository with clean production source"
git push origin main
```

Do **not** use `[deploy-cloud-run]` in the replacement commit. First allow the validation job to finish.

## 3. Deploy only after validation passes

Open **Actions → Cloud Run Production → Run workflow** and set `deploy = true`.

## 4. Required live verification

Verify:

- `https://sapa27.anti27.workers.dev/ready`
- `https://sapa27.anti27.workers.dev/version`
- `https://sapa27.anti27.workers.dev/network-health`
- `https://sapa27.anti27.workers.dev/upstream-health`

`/upstream-health` must report a successful `gas-direct-json` upstream before the release is accepted.

## 5. GAS remains a separate deployment

The GAS `.gs` / `Scripts_Page_*.html` source is not copied into this GitHub repository. This repository contains the Cloudflare/Cloud Run frontend and gateway layer only.
