import { sendEmail } from "../../utils/Email";

export default async function handler(req, res) {
  const payload = req.body;
  var response = await sendEmail(payload.to, payload.templateId, {
    id: payload.uuid,
    uuid: payload.uuid,
    code: payload.code,
    user: payload.email,
    password: payload.password,
    activationHash: payload.hash,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  });

  res.status(response.status).send("OK");
}
