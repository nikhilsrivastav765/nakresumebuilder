// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZvTFb5iBbr5qtosALof2KDxLExvxKqLA",
  authDomain: "nak-resume-builder.firebaseapp.com",
  projectId: "nak-resume-builder",
  storageBucket: "nak-resume-builder.appspot.com", // ✅ FIXED
  messagingSenderId: "1036654464760",
  appId: "1:1036654464760:web:56ebb0afe416f77725f50d",
  measurementId: "G-3P688QDK25"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * 🔐 Fetch premium status for a user
 * @param {string} uid - The user's Firebase UID
 * @returns {Promise<boolean>}
 */
export const getPremiumStatus = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data().isPremium === true;
  } else {
    // Document does not exist → create it now
    await setDoc(userRef, {
      isPremium: false,
      createdAt: new Date()
    });
    return false;
  }
};



export default app;
