import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth } from "../auth/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { CgMenuGridO } from "react-icons/cg";
import { CiUser } from "react-icons/ci";
import Menu from "./Menu";
import { motion } from "framer-motion"; // 👉 Add Framer Motion

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 flex w-full h-16 border-b border-gray-200/30 shadow-lg backdrop-blur-md items-center justify-between z-[1] px-3 lg:h-16 lg:px-8">
        <div className="flex gap-3 items-center">
          <button onClick={toggleMenu}>
            <CgMenuGridO className="text-3xl text-[#4F46E5] lg:hidden" />
          </button>
          {isMenuOpen && <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />}
          <h1 className="lg:text-2xl font-bold text-xl">
            <span className="text-[#4F46E5]">NAK</span>res.builder
          </h1>
        </div>

        <div className="fixed left-[50%] -translate-x-[50%] hidden lg:flex">
          <ul className="flex items-center justify-between gap-20">
            <li>
              <Link className="text-md text-black text-center font-semibold" to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-md font-semibold" to="contact">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="text-md font-semibold" to="/layouts">
                Browse Layouts
              </Link>
            </li>
          </ul>
        </div>

        {loading ? null : user ? (
          <div className="relative group flex items-center gap-3">
            <button className="flex items-center space-x-2 px-2 py-2 bg-[#4F46E5] rounded-full">
              <CiUser className="text-white text-xl" />
            </button>
            <span className="text-xs lg:text-lg font-semibold cursor-pointer lg:flex hidden">
              {user?.email || user?.name}
            </span>
            <div className="absolute right-0 top-10 mt-2 w-48 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <li className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                <Link to="/dashboard">Profile</Link>
              </li>
              <button
                className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                className="lg:text-lg bg-[#4F46E5] text-white px-5 py-2 rounded-full text-center text-md lg:font-normal font-semibold"
                to="/auth"
              >
                Get Started
              </Link>
            </motion.div>

           
            
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
