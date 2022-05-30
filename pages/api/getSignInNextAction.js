import Firebase from "../../firebase";
import { paths } from "../../utils/paths";

export default async function handler(req, res) {
  const payload = req.body;

  const db = Firebase.default.firestore();
  const activationRef = db.collection("ActivationRecords").doc(payload.userId);
  const activationRecord = await activationRef.get();

  if (!activationRecord.exists) {
    res.status(500).send({ target: paths.ERROR.NO_ACTIVATION_RECORD() });
    return;
  }
  if (!activationRecord.data().passwordReset) {
    res.status(500).send({ target: paths.ERROR.NO_PASSWORD_RESET() });
    return;
  }
  if (!activationRecord.data().locationAssigned) {
    res.status(500).send({ target: paths.ERROR.NO_LOCATION() });
    return;
  }
  if (!activationRecord.data().registered) {
    res.status(500).send({ target: paths.ERROR.NO_REGISTRATION() });
    return;
  }
  if (!activationRecord.data().welcomed) {
    res.status(200).send({ target: paths.WELCOME() });
    return;
  }

  res.status(200).send({ target: paths.DASHBOARD() });
}
