#!/usr/bin/env bash
set -euo pipefail

REPO="sapa27/main"
REGION="${GCP_REGION:-asia-southeast3}"
SERVICE="${CLOUD_RUN_SERVICE:-sapa27-gateway}"
POOL_ID="${WIF_POOL_ID:-github-actions}"
PROVIDER_ID="${WIF_PROVIDER_ID:-sapa27-main}"
DEPLOYER_NAME="${DEPLOYER_SA_NAME:-github-cloud-run-deployer}"

PROJECT_ID="${1:-${GCP_PROJECT_ID:-}}"
BILLING_ACCOUNT_ID="${2:-${GCP_BILLING_ACCOUNT_ID:-}}"
if [ -z "$PROJECT_ID" ]; then
  PROJECT_ID="$(gcloud config get-value project 2>/dev/null || true)"
fi
if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "(unset)" ]; then
  echo "Usage: bash cloud-run-gateway/bootstrap-gcp.sh YOUR_PROJECT_ID [BILLING_ACCOUNT_ID]" >&2
  exit 2
fi

echo "==> Project: $PROJECT_ID"
gcloud config set project "$PROJECT_ID" >/dev/null

if [ -n "$BILLING_ACCOUNT_ID" ]; then
  echo "==> Link billing account"
  gcloud billing projects link "$PROJECT_ID" --billing-account="$BILLING_ACCOUNT_ID" >/dev/null
fi

echo "==> Verify active billing"
BILLING_ENABLED="$(gcloud billing projects describe "$PROJECT_ID" --format='value(billingEnabled)' 2>/dev/null || true)"
if [ "$BILLING_ENABLED" != "True" ] && [ "$BILLING_ENABLED" != "true" ]; then
  echo "Billing is not enabled for project $PROJECT_ID. Link an active billing account before continuing." >&2
  exit 3
fi

echo "==> Enable required APIs"
gcloud services enable   run.googleapis.com   cloudbuild.googleapis.com   artifactregistry.googleapis.com   iamcredentials.googleapis.com   sts.googleapis.com   serviceusage.googleapis.com

PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"
DEPLOYER_EMAIL="${DEPLOYER_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
COMPUTE_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

echo "==> Ensure deployer service account"
if ! gcloud iam service-accounts describe "$DEPLOYER_EMAIL" >/dev/null 2>&1; then
  gcloud iam service-accounts create "$DEPLOYER_NAME"     --display-name="GitHub Cloud Run deployer"
fi

echo "==> Grant source-deploy roles"
gcloud projects add-iam-policy-binding "$PROJECT_ID"   --member="serviceAccount:$DEPLOYER_EMAIL"   --role="roles/run.sourceDeveloper"   --condition=None >/dev/null

gcloud projects add-iam-policy-binding "$PROJECT_ID"   --member="serviceAccount:$DEPLOYER_EMAIL"   --role="roles/serviceusage.serviceUsageConsumer"   --condition=None >/dev/null

# CR-2 bootstrap uses --allow-unauthenticated once. This role supplies
# run.services.setIamPolicy for that initial public service configuration.
gcloud projects add-iam-policy-binding "$PROJECT_ID"   --member="serviceAccount:$DEPLOYER_EMAIL"   --role="roles/run.admin"   --condition=None >/dev/null

echo "==> Allow deployer to act as the Cloud Run service identity"
gcloud iam service-accounts add-iam-policy-binding "$COMPUTE_SA"   --member="serviceAccount:$DEPLOYER_EMAIL"   --role="roles/iam.serviceAccountUser" >/dev/null

echo "==> Grant Cloud Run Builder to the default build service account"
gcloud projects add-iam-policy-binding "$PROJECT_ID"   --member="serviceAccount:$COMPUTE_SA"   --role="roles/run.builder"   --condition=None >/dev/null

echo "==> Ensure Workload Identity Pool"
if ! gcloud iam workload-identity-pools describe "$POOL_ID"   --location=global >/dev/null 2>&1; then
  gcloud iam workload-identity-pools create "$POOL_ID"     --location=global     --display-name="GitHub Actions"     --description="GitHub Actions OIDC for sapa27/main"
fi

echo "==> Ensure GitHub OIDC provider"
if ! gcloud iam workload-identity-pools providers describe "$PROVIDER_ID"   --location=global   --workload-identity-pool="$POOL_ID" >/dev/null 2>&1; then
  gcloud iam workload-identity-pools providers create-oidc "$PROVIDER_ID"     --location=global     --workload-identity-pool="$POOL_ID"     --display-name="sapa27 main GitHub Actions"     --issuer-uri="https://token.actions.githubusercontent.com/"     --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.ref=assertion.ref,attribute.repository_owner=assertion.repository_owner"     --attribute-condition="assertion.repository=='$REPO' && assertion.ref=='refs/heads/main'"
fi

echo "==> Permit only sapa27/main identities to impersonate deployer"
PRINCIPAL="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/attribute.repository/${REPO}"
gcloud iam service-accounts add-iam-policy-binding "$DEPLOYER_EMAIL"   --member="$PRINCIPAL"   --role="roles/iam.workloadIdentityUser" >/dev/null

PROVIDER_RESOURCE="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/providers/${PROVIDER_ID}"

cat <<EOF

Google Cloud bootstrap complete.

Set these GitHub repository variables in sapa27/main:

GCP_PROJECT_ID=$PROJECT_ID
GCP_REGION=$REGION
CLOUD_RUN_SERVICE=$SERVICE
GCP_WIF_PROVIDER=$PROVIDER_RESOURCE
GCP_SERVICE_ACCOUNT=$DEPLOYER_EMAIL

Then run the "Cloud Run Gateway" workflow with deploy=true.

EOF
