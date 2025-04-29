  import { motion } from "framer-motion";
  import React, { useEffect, useRef } from "react";
  import { RxCross1 } from "react-icons/rx";
  import { IoHome } from "react-icons/io5";
  import { FaPhoneAlt } from "react-icons/fa";
  import { RiLayout2Fill } from "react-icons/ri";
  import { useNavigate } from "react-router-dom";

  const Menu = ({ toggleMenu, isMenuOpen }) => {
    const navigate = useNavigate();
    const menuRef = useRef(null);

    // Close the menu when clicking outside
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          closeMenuWithAnimation();
        }
      };

      if (isMenuOpen) {
        document.addEventListener("mousedown", handleOutsideClick);
      } else {
        document.removeEventListener("mousedown", handleOutsideClick);
      }

      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [isMenuOpen]);

    // Function to close the menu with animation
    const closeMenuWithAnimation = () => {
      const menu = document.querySelector(".menu");
      menu.style.transform = "translateX(-100%)"; // Slide out animation

      setTimeout(() => {
        toggleMenu(); // Close the menu after animation
      }, 300); // Match transition duration
    };

    // Function to navigate and close menu
    const handleNavigation = (path) => {
      closeMenuWithAnimation();
      setTimeout(() => navigate(path), 300); // Wait for animation
    };

    return (
      <motion.div
        ref={menuRef}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }} // Exit animation
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`menu fixed w-1/4 h-fit bg-gray-100 z-[10] py-3 top-0 left-0 transition-transform duration-300 backdrop-blur-lg shadow-lg border border-white/40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {}
        <motion.div className="flex items-center justify-between h-16 px-5">
          <button onClick={closeMenuWithAnimation}>
            <RxCross1 className="text-3xl text-black mr-3" />
          </button>
        </motion.div>

        {}
        <div className="relative">
          <div className="flex flex-col h-fit items-center gap-2 mt-8">
            <motion.div
              onClick={() => handleNavigation("/home")}
              className="relative flex items-center justify-center w-10 h-10 rounded-2xl cursor-pointer"
            >
              <motion.div className="absolute w-16 h-16 bg-[#4F46E5] rounded-2xl -z-10" />
              <IoHome className="text-white text-6xl " />
            </motion.div>
            <p className="mt-4 text-sm font-semibold text-gray-600 text-center">
              Home
            </p>
          </div>

          <div className="flex flex-col h-fit items-center gap-2 mt-8">
            <motion.div
              onClick={() => handleNavigation("/contact")}
              className="relative flex items-center justify-center w-10 h-10 rounded-2xl cursor-pointer"
            >
              <motion.div className="absolute w-16 h-16 bg-[#4F46E5] rounded-2xl -z-10" />
              <FaPhoneAlt className="text-white text-6xl " />
            </motion.div>
            <p className="mt-4 text-sm font-semibold text-gray-600 text-center">
              Contact Us
            </p>
          </div>

          <div className="flex flex-col h-fit items-center gap-2 mt-8">
            <motion.div
              onClick={() => handleNavigation("/layouts")}
              className="relative flex items-center justify-center w-10 h-10 rounded-2xl cursor-pointer"
            >
              <motion.div className="absolute w-16 h-16 bg-[#4F46E5] rounded-2xl -z-10" />
              <RiLayout2Fill className="text-white text-6xl " />
            </motion.div>
            <p className="mt-4 text-sm font-semibold text-gray-600 text-center">
              Layouts
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  export default Menu;
