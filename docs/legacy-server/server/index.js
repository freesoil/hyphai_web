import http from "node:http";
import { handleWebhook } from "./webhookHandler.js";

const PORT = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
  handleWebhook(req, res, {
    onMessage: body => {
      // Add your processing here if needed.
      // Keep it fast; do not block the response.
      void body;
    },
  });
});

server.listen(PORT, () => {
  console.log(`Webhook server listening on :${PORT}`);
});
