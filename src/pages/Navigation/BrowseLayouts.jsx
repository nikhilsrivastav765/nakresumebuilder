import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const layouts = [
  {
    title: "Modern Resume",
    image: "https://i.pinimg.com/736x/e6/8a/2b/e68a2b5b741339d2d05e20502654a118.jpg",
    route: "/modern",
  },
  {
    title: "Classic Resume",
    image: "https://i.pinimg.com/736x/cd/42/48/cd4248424047f912a3eab2c3c226b212.jpg",
    route: "/classic",
  },
  {
    title: "Creative Resume",
    image: "https://i.pinimg.com/736x/93/f3/d5/93f3d53d14ff1e982dbff1d18bdb6825.jpg",
    route: "/creative",
  },
];

const BrowseLayouts = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-20">
      {}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-gray-800 mb-12 text-center lg:text-left"
      >
        Choose Your Resume Layout
      </motion.h1>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 ">
        {layouts.map((layout, index) => (
          <motion.div
            key={index}
            className="p-8 bg-gray-100 shadow-xl rounded-3xl flex flex-col items-center text-center border border-gray-300 lg:w-fit lg:h-[700px] transform transition-all duration-300 hover:scale-105 "
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{layout.title}</h2>
            <img
              src={layout.image}
              alt={layout.title}
              className="lg:w-[350px] lg:h-[500px] object-cover rounded-lg shadow-md border border-gray-300 "
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mt-6 px-8 py-3 bg-[#4F46E5] text-white font-semibold text-lg rounded-full shadow-lg hover:bg-[#4F46E5] transition duration-300"
              onClick={() => navigate(layout.route)}
            >
              Select
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BrowseLayouts;
