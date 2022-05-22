import Firebase from "../../firebase";
import { paths } from "../../utils/paths";

export default async function handler(req, res) {
  const payload = req.body;

  const db = Firebase.default.firestore();
  const activationRef = db.collection("ActivationRecords").doc(payload.userId);
  const activationRecord = await activationRef.get();

  const userProfileRef = db
    .collection("UserProfiles")
    .where("userId", "==", payload.userId);
  const userProfileRecord = await userProfileRef.get();

  if (!activationRecord.exists) {
    res.status(500).send({ target: paths.ERROR.NO_ACTIVATION_RECORD() });
    return;
  }
  if (!activationRecord.data().locationAssigned) {
    res.status(200).send({ target: paths.REGISTER.LOCATION() });
    return;
  }
  if (!activationRecord.data().registered) {
    const { location, profile } = userProfileRecord.docs[0].data();

    res.status(200).send({
      target:
        profile === "COLLABORATOR"
          ? paths.REGISTER.PROFILE_COLLABORATOR(location)
          : paths.REGISTER.PROFILE_RESIDENT(location),
    });
    return;
  }
  if (!activationRecord.data().welcomed) {
    res.status(200).send({ target: paths.WELCOME() });
    return;
  }

  res.status(200).send({ target: paths.DASHBOARD() });
}
