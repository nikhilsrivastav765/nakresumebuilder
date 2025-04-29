// src/lib/firestore.js
import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Create a user document after signup
 */
export const createUserDocument = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, {
    isPremium: false,
    email: user.email,
    createdAt: new Date()
  });
};

/**
 * Get premium status of a user
 */
export const getPremiumStatus = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data().isPremium === true;
  } else {
    return false;
  }
  
};
