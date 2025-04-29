import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../components/auth/firebaseConfig';
import { motion } from 'framer-motion';
import { FiUser, FiLock } from 'react-icons/fi';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Define your Admin Unique ID and password manually here
  const validAdminId = 'nikhil@admin';   // Unique ID (not email now)
  const adminEmail = 'nikhilsrivastav765@gmail.com'; // Actual email registered in Firebase for password reset

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    try {
      // In this system, ID and Password both are mandatory
      if (adminId !== validAdminId) {
        setError('Access Denied: Invalid Admin ID!');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, adminEmail, password);
      const user = userCredential.user;

      if (user.email === adminEmail) {
        navigate('/admin');
      } else {
        setError('Access Denied: You are not an Admin!');
        await auth.signOut();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    setSuccessMsg('');
    try {
        await sendPasswordResetEmail(auth, adminEmail);
        setSuccessMsg('Password reset link has been sent to your Admin email.');
    } catch (error) {
        console.error("Error sending password reset email:", error);
        setError('Failed to send reset email. Try again later.');
    }
};


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center"
    >
      {}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome to NAK Resume Builder</h1>
      </div>

      {}
      <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">
        {}
        <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-8">
          <img
            src="https://i.pinimg.com/736x/bd/a3/17/bda3177a3943ffdbcc652b3a678a0d74.jpg"
            alt="Login Illustration"
            className="w-80 h-80 object-contain"
          />
        </div>

        {}
        <div className="w-full md:w-1/2 p-8">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-bold text-gray-800 mb-6"
          >
            Login as an Admin User
          </motion.h2>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mb-4"
            >
              {error}
            </motion.div>
          )}
          {successMsg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 text-sm mb-4"
            >
              {successMsg}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <FiUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
                placeholder="Admin Unique ID"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-300"
            >
              LOGIN
            </motion.button>

            <div className="text-sm flex justify-between mt-3 text-gray-500">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="hover:underline"
              >
                Forgot your password?
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            Terms of use. Privacy policy.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
