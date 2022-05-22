import Firebase from "../../firebase";
import { paths } from "../../utils/paths";

export default async function handler(req, res) {
  const payload = req.body;

  const db = Firebase.default.firestore();

  const locationRef = db.collection("Locations").doc(payload.locationId);

  await db
    .collection("UserProfiles")
    .doc(payload.profileId)
    .update({
      location: payload.locationId,
      locationRef: locationRef,
      locationSetOnUTC: new Date().toISOString(),
    });

  await db
    .collection("ActivationRecords")
    .doc(payload.userId)
    .update({
      locationAssigned: true,
      locationSetOnUTC: new Date().toISOString(),
    });

  res.status(200).json({
    target:
      payload.profileType === "COLLABORATOR"
        ? paths.REGISTER.PROFILE_COLLABORATOR(payload.locationId)
        : paths.REGISTER.PROFILE_RESIDENT(payload.locationId),
  });
}
