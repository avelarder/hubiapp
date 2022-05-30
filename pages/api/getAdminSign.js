import Firebase from "../../firebase";
import { paths } from "../../utils/paths";

export default async function handler(req, res) {
  res.status(200).send({ target: paths.ADMIN.DASHBOARD() });
}
