
import Firebase from "../../firebase";
import { paths } from "../../utils/paths";


export default async function handler(req, res) {
    const payload = req.body;

    const db = Firebase.default.firestore();
    const activationRef = db
        .collection("ActivationRecords")
        .doc(payload.userId);
    const doc = await activationRef.get();

    if (!doc.exists) {
        res.status(500).send({ target: paths.ERROR.NO_ACTIVATION_RECORD() });
        return;
    }
    if (!doc.data().locationAssigned) {
        res.status(200).send({ target: paths.REGISTER.LOCATION() });
        return;
    }
    if (!doc.data().registered) {
        res.status(200).send({ target: paths.REGISTER.PROFILE() });
        return;
    }
    if (!doc.data().welcomed) {
        res.status(200).send({ target: paths.WELCOME() });
        return;
    }

    res.status(200).send({ target: paths.DASHBOARD() });
}