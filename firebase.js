import * as Firebase from "firebase";

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "gs://noodor-7279.appspot.com"
};

// if a Firebase instance doesn't exist, create one
if (Firebase.default.apps == null || !Firebase.default.apps.length) {
  Firebase.default.initializeApp(FirebaseCredentials);
}
// firebase.storage();


export default Firebase;
