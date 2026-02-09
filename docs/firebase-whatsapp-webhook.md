# Firebase WhatsApp Webhook Service

This repository includes a Firebase Functions (2nd gen) service that implements
the WhatsApp Cloud API webhook verification handshake and a minimal POST handler.

## Architecture overview (high level)

Deployment uses Firebase Functions 2nd gen (Cloud Run functions):

1. Source code is uploaded and built with Cloud Build.
2. A container image is stored in Artifact Registry.
3. Cloud Run executes the function and scales to zero when idle.

Images in Artifact Registry are cleaned up by a repository cleanup policy to
prevent storage accumulation.

References:

- Cloud Run functions overview (includes architecture overview):
  https://docs.cloud.google.com/run/docs/functions/overview
- Artifact Registry cleanup policy:
  https://cloud.google.com/artifact-registry/docs/repositories/cleanup-policy-overview
- Cloud Run autoscaling:
  https://cloud.google.com/run/docs/about-instance-autoscaling

## Files

- `api/whatsappWebhook.js` – modular GET/POST handler.
- `api/index.js` – Firebase Functions entrypoint.
- `api/package.json` – runtime and dependencies.

## Deploy steps (summary)

1. Set the project id in `.firebaserc`.
2. `npm install` in `api/`.
3. `firebase functions:secrets:set WHATSAPP_VERIFY_TOKEN`
4. `firebase deploy --only functions`

## Verification test

```bash
curl -i "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/webhook?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=123"
```

Expect `200` and body `123`.
