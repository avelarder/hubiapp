
import Firebase from "../../firebase";
import { paths } from "../../utils/paths";


export default async function handler(req, res) {
    const payload = req.body;

    const db = Firebase.default.firestore();
    await db
        .collection("UserProfiles")
        .doc(payload.profileId)
        .update({
            location: payload.locationId,
            locationSetOnUTC: new Date().toISOString(),
        });

    await db
        .collection("ActivationRecords")
        .doc(payload.userId)
        .update({
            locationAssigned: true,
            locationSetOnUTC: new Date().toISOString(),
        });

    res.status(200).send({ target: paths.REGISTER.PROFILE(payload.locationId) });
}