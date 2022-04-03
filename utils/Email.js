
export async function sendEmail(to, templateId, substitutions) {

    const body = JSON.stringify({
        "from": {
            "email": "arturo@emmergia.biz"
        },
        "subject": "HUBI - Activación de Cuenta",
        "template_id": templateId,
        "personalizations": [
            {

                "to": [
                    {
                        "email": "itproschannel@gmail.com",
                        "name": "Arturo"
                    },
                    {
                        "email": to,
                        "name": "Arturo"
                    }

                ],
                "subject": "HUBI - Activación de Cuenta",
                "dynamic_template_data": substitutions
            }
        ]
    });


    try {
        var response = await fetch(process.env.NEXT_PUBLIC_SENDGRID_API_URL, {
            method: 'POST',
            headers: {
                "Authorization": 'Bearer ' + process.env.NEXT_PUBLIC_SENDGRID_API_KEY,
                "Content-Type": "application/json",
            },
            body: body
        })
        return response;
    } catch (error) {
        console.error(error)
    }

}