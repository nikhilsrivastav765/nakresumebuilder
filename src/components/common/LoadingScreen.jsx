import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Remove loading screen after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div initial={{opcity : 1}} animate={{opacity : 0.3, y : -1000}} transition={{delay : 2.6}}className="flex flex-col justify-center items-center h-screen bg-white">
      {}
      <motion.h1
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease:"easeInOut"}}
        className="text-4xl md:text-8xl font-bold text-blue-600 text-center"
      >
        Welcome to <span className="text-gray-800">Nak Resume Builder</span>
      </motion.h1>

      {}
      <motion.div initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease:"easeInOut"}} className="flex space-x-2 mt-12">
        <motion.div
          className="w-8 h-8 bg-blue-600 rounded-full"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        />
        <motion.div
          className="w-8 h-8 bg-gray-600 rounded-full"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
          className="w-8 h-8 bg-black rounded-full"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;