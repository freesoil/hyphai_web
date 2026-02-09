const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { handleWhatsAppWebhook } = require("./whatsappWebhook");

const whatsappVerifyToken = defineSecret("WHATSAPP_VERIFY_TOKEN");

exports.webhook = onRequest({ secrets: [whatsappVerifyToken] }, (req, res) => {
  handleWhatsAppWebhook(req, res, {
    verifyToken: whatsappVerifyToken.value(),
  });
});
