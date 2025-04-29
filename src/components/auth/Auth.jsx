import React, { useState } from "react";
import { auth, getPremiumStatus } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

// 🔥 Create User Document Function
const createUserDocument = async (user, name) => {
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      name: name,
      email: user.email,
      isPremium: false, // Default to free
      createdAt: serverTimestamp(), // Firestore server timestamp
    });
  }
};

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState(""); // Added name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Added state for forgot password
  const navigate = useNavigate();

  const handleAuth = async (event) => {
    event.preventDefault();
    try {
      let userCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        await createUserDocument(user, name);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
  
      // Now, wait for the user state to be set
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/dashboard");
        } else {
          setError("Authentication failed. Please check your credentials and try again.");
        }
      });
    } catch (error) {
      console.error("Authentication Error:", error);
      setError("Authentication failed. Please check your credentials and try again.");
    }
  };
  
  

  // Password Reset Handler
  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setIsForgotPassword(false); // Close the forgot password modal after email is sent
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError("Error sending password reset email. Please try again.");
    }
  };
  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // 🚀 Navigate first because login is successful
      navigate("/dashboard");
  
      // ✅ Then check premium status (do not block navigation)
      const isPremium = await getPremiumStatus(user.uid);
  
      if (!isPremium) {
        console.log("Not premium user. Show upgrade options or limit features.");
        // You can store isPremium status in state if needed
      } else {
        console.log("Welcome Premium User!");
      }
  
    } catch (error) {
      console.error("Login error:", error.message);
      // Show error to user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f7f7f7] to-[#ffffff] backdrop-blur-lg">
      <div className="w-[1200px] bg-white shadow-xl rounded-xl flex overflow-hidden py-0 px-12">
        {/* Left Side - Illustration */}
        <div className="lg:w-1/2 lg:flex flex-col justify-center items-center p-8 ">
          <img
            src="https://i.pinimg.com/736x/47/4c/ed/474cedf5e451d621fdd044d3fc837f43.jpg"
            alt="Illustration"
            className="w-[600px] h-[600px] object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-center w-fit">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {isSignup ? "Sign Up" : "Welcome Back"}
            </h2>
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm text-gray-500 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100"
            >
              {isSignup ? "Log In" : "Sign Up"}
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            {isSignup ? "Create an account" : "Login to your account"}
          </p>

          {/* Form */}
          <form onSubmit={handleAuth}>
            {isSignup && (
              <div className="mt-4">
                <label className="text-gray-600 text-sm">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border-b rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            {/* Email Input */}
            <div className="mt-4">
              <label className="text-gray-600 text-sm">Email</label>
              <input
                type="email"
                className="w-full p-3 border-b rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="mt-3">
              <label className="text-gray-600 text-sm">Password</label>
              <input
                type="password"
                className="w-full p-3 border-b rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Normal Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-lg font-semibold hover:opacity-90 transition-all"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            {/* Admin Login Button */}
            {!isSignup && (
              <button
                className="w-full py-3 mt-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg text-lg font-semibold hover:opacity-90 transition-all"
              >
                <Link to="/admin-login">Admin Login</Link>
              </button>
            )}
          </form>

          {/* Forgot Password */}
          {!isSignup && !isForgotPassword && (
            <p
              className="text-sm text-gray-500 text-right mt-2 cursor-pointer hover:underline"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot password?
            </p>
          )}

          {/* Forgot Password Form */}
          {isForgotPassword && (
            <div>
              <p className="text-sm text-gray-500 mt-4">Enter your email to reset your password:</p>
              <input
                type="email"
                className="w-full p-3 mt-2 border-b rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handlePasswordReset}
                className="w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg text-lg font-semibold hover:opacity-90 transition-all"
              >
                Send Reset Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
