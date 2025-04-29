import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../auth/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getPremiumStatus } from "../auth/firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const isPremium = await getPremiumStatus(user.uid); // Fetch premium status
          setCurrentUser({ ...user, isPremium }); // Attach premium status to user object
        } catch (error) {
          console.error("Error fetching premium status:", error);
          setCurrentUser({ ...user, isPremium: false });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
