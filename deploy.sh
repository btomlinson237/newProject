#!/usr/bin/env bash
set -euo pipefail

# 1) Load your GCP settings
if [[ ! -f deploy.conf ]]; then
  echo "🚨  deploy.conf not found! Copy deploy.conf.example → deploy.conf and fill in your values." >&2
  exit 1
fi
source deploy.conf

# 2) Make sure gcloud is pointed at the right project
echo "🔧  Setting project to $PROJECT_ID"
gcloud config set project "$PROJECT_ID"

# 3) Build & push your container via Cloud Build
IMAGE="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"
echo "🚧  Building & pushing image $IMAGE"
gcloud builds submit --tag "$IMAGE"

# 4) Deploy to Cloud Run
echo "🚀  Deploying service $SERVICE_NAME to Cloud Run in region $REGION"
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated

# 5) Fetch & show the URL
URL=$(gcloud run services describe "$SERVICE_NAME" \
  --platform managed \
  --region "$REGION" \
  --format="value(status.url)")

echo
echo "✅  Deployment complete! Your service is live at:"
echo "   $URL"
