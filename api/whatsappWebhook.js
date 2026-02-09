function handleWhatsAppWebhook(req, res, opts = {}) {
  const verifyToken =
    opts.verifyToken ||
    process.env.WHATSAPP_VERIFY_TOKEN ||
    process.env.WEBHOOK_VERIFY_TOKEN ||
    "";
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token && token === verifyToken && challenge) {
      res.status(200).set("Content-Type", "text/plain").send(challenge);
      return;
    }

    res.status(403).set("Content-Type", "text/plain").send("Forbidden");
    return;
  }

  if (req.method === "POST") {
    // TODO: handle inbound messages/status webhooks here.
    // Keep this fast; do not block the response.
    res.status(200).set("Content-Type", "text/plain").send("OK");
    return;
  }

  res.status(405).set("Allow", "GET, POST").send("Method Not Allowed");
}

module.exports = { handleWhatsAppWebhook };
