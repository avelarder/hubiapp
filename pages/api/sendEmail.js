import { sendEmail } from "../../utils/Email";


export default async function handler(req, res) {
    const payload = req.body;
    console.log(payload)
    var response = await sendEmail(
        payload.to,
        payload.templateId,
        {
            "id": payload.uuid,
            "code": payload.code,
            "activationHash": payload.hash,
            "baseUrl": process.env.NEXT_PUBLIC_BASE_URL,
        }
    )
    res.status(response.status).send("OK");
}