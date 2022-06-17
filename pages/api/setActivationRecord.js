import MD5 from "crypto-js/md5";
import Mod9710 from "../../utils/iso7064";
import Firebase from "../../firebase";
import { sendEmail } from "../../utils/Email";
import { uuid as v4 } from "uuidv4";

export default async function handler(req, res) {
  const payload = req.body;
  const activationType = payload.activationType;

  if (!activationType) {
    res.status(500).send({ error: "Missing Activation Type" });
    return;
  }

  const userProfileId = v4();
  const db = Firebase.default.firestore();

  const locationRef = db.collection("Locations").doc(payload.locationId);

  await db.collection("UserProfiles").doc(userProfileId).set({
    userId: payload.userId,
    profile: activationType,
    location: payload.locationId,
    locationRef: locationRef,
    createdOnUTC: new Date().toISOString(),
    updatedOnUTC: new Date().toISOString(),
    locationSetOnUTC: new Date().toISOString(),
  });

  const activationKey =
    activationType === "COLLABORATOR"
      ? process.env.NEXT_PUBLIC_COLLABORATOR_ACTIVATION
      : process.env.NEXT_PUBLIC_RESIDENT_ACTIVATION;

  const code = Mod9710.encode(Math.floor(Math.random() * 100000));
  const activationHash = MD5(
    `${payload.userId}|${activationKey}|${code}`
  ).toString();

  await db.collection("ActivationRecords").doc(payload.userId).set({
    code: code,
    activationHash: activationHash,
    activationKey: activationKey,
    createdOnUTC: new Date().toISOString(),
    expired: false,
    emailValidated: false,
    passwordReset: false,
    locationAssigned: true,
    locationSetOnUTC: new Date().toISOString(),
    registered: false,
    welcomed: false,
    expiredOnUTC: null,
    registeredOnUTC: null,
    welcomedOnUTC: null,
  });

  var response = await sendEmail(payload.to, payload.templateId, {
    uuid: payload.userId,
    code: code,
    user: payload.email,
    password: payload.password,
    activationHash: activationHash,

    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  });

  res.status(response.status).json({ status: "OK", activationHash });
}
