import { sendEmail } from "../../utils/Email";


export default async function handler(req, res) {
    const payload = req.body;

    var response = await sendEmail(
        payload.to,
        payload.templateId,
        {
            "id": payload.uuid,
            "code": payload.code,
            "activationHash": payload.hash,
        }
    )
    res.status(response.status).send("OK");
}