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

## Custom domain via Firebase Hosting (`api.hyphai.us`)

Use Firebase Hosting as the public entrypoint and route requests to the
2nd-gen function. This avoids exposing `cloudfunctions.net` directly and keeps
the webhook URL stable.

1. In Firebase Console, open **Hosting** for project `jarvis-ce674`.
2. Add custom domain `api.hyphai.us` to the Hosting site and complete DNS
   verification at your registrar.
3. Keep a Hosting rewrite that sends webhook traffic to function `webhook` in
   `us-central1`.
4. Deploy Hosting + Functions: `firebase deploy --only hosting,functions`.

Current rewrite in this repo:

```json
{
  "hosting": {
    "rewrites": [
      {
        "source": "/webhook",
        "function": {
          "functionId": "webhook",
          "region": "us-central1"
        }
      }
    ]
  }
}
```

Webhook callback URL choices:

- Path-based (matches current config): `https://api.hyphai.us/webhook`
- Root URL (if you want no `/webhook`): change rewrite source to `"/"` and use
  `https://api.hyphai.us`

## Verification test

```bash
curl -i "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/webhook?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=123"
```

Expect `200` and body `123`.
