// Minimal WhatsApp Cloud API webhook handler.
// Designed to be framework-agnostic and fast for Meta's GET verification.

const VERIFY_TOKEN =
  process.env.WHATSAPP_VERIFY_TOKEN || process.env.WEBHOOK_VERIFY_TOKEN || "";

export function handleWebhook(req, res, opts = {}) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname !== "/webhook") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
    return;
  }

  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token && token === VERIFY_TOKEN && challenge) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(challenge);
      return;
    }

    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return;
  }

  if (req.method === "POST") {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      let body = null;
      try {
        body = raw ? JSON.parse(raw) : null;
      } catch {
        body = raw;
      }

      if (typeof opts.onMessage === "function") {
        try {
          opts.onMessage(body, req);
        } catch {
          // Intentionally swallow to keep webhook ack fast.
        }
      }

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("OK");
    });
    return;
  }

  res.writeHead(405, { "Allow": "GET, POST", "Content-Type": "text/plain" });
  res.end("Method Not Allowed");
}
