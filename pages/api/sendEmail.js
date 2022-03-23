import { sendEmail } from "../../utils/Email";


export default async function handler(req, res) {
    const payload = req.body;

    var response = await sendEmail(
        payload.to,
        process.env.NEXT_PUBLIC_SENDGRID_TEMPLATE_ID_EMAIL_VERIFICATION,
        {
            "id": payload.uuid,
            "code": payload.code,
            "activationHash": payload.hash,
        }
    )
    res.status(response.status).send("OK");
}