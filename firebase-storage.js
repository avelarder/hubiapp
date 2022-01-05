import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket-url>'
};
const firebaseApp = initializeApp(firebaseConfig);

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// if a Firebase instance doesn't exist, create one
if (Firebase.default.apps == null || !Firebase.default.apps.length) {
  Firebase.default.initializeApp(FirebaseCredentials);
}

export default Firebase;




// Set the configuration for your app
// TODO: Replace with your app's config object


// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);