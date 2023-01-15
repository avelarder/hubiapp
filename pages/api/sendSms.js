export default async function handler(req, res) {
  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
  const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;

  const client = require("twilio")(accountSid, authToken, {
    lazyLoading: true,
  });

  var message = await client.messages.create({
    body: "Welcome to Hubi!",
    from: "+59899882205",
    to: "+51994717132",
  });

  res.status(200).json(message);
}
