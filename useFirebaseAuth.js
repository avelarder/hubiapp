import { FireIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import Firebase from "./firebase";

const formatAuthUser = (user, profiles) => ({
  uid: user.uid,
  email: user.email,
  profiles: profiles,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const db = Firebase.default.firestore();
    const profiles = await db
      .collection("UserProfiles")
      .where("userId", "==", authState.uid)
      .get();

    var mapped = await Promise.all(
      profiles.docs.map(async (p) => {
        const data = p.data();
        const docRef = (await data.locationRef?.get())?.data();

        return {
          locationId: data.location,
          location: docRef?.Title,
          buildings: docRef?.Buildings,
          profile: data.profile,
          profileId: data.id,
        };
      })
    );

    var formattedUser = formatAuthUser(authState, mapped);

    setAuthUser(formattedUser);

    setLoading(false);
  };

  const signInWithEmailAndPassword = (email, password) =>
    Firebase.default.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email, password) =>
    Firebase.default.auth().createUserWithEmailAndPassword(email, password);

  const sendPasswordResetEmail = (email, action) =>
    Firebase.default.auth().sendPasswordResetEmail(email, action);

  const confirmPasswordReset = (code, newPassword) =>
    Firebase.default.auth().confirmPasswordReset(code, newPassword);

  const signOut = () =>
    Firebase.default
      .auth()
      .signOut()
      .then(clear);
  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = Firebase.default
      .auth()
      .onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    confirmPasswordReset,
    signOut,
  };
}
