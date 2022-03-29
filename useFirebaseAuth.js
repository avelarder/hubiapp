import { useState, useEffect } from "react";
import Firebase from "./firebase";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
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
    var formattedUser = formatAuthUser(authState);
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

  const signOut = () => Firebase.default.auth().signOut().then(clear);
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
