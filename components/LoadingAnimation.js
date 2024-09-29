import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';

const messages = [
  "Powering up your learning journey",
  "Igniting your curiosity",
  "Preparing personalized insights",
  "Crafting your unique skill path",
  "Unlocking your potential"
];

const LoadingAnimation = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 bg-opacity-90 z-50">
      <motion.div
        className="relative w-32 h-32 mb-8"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-blue-200 rounded-full opacity-25"></div>
        <div className="absolute inset-2 bg-blue-300 rounded-full opacity-50"></div>
        <div className="absolute inset-4 bg-blue-400 rounded-full opacity-75"></div>
        <div className="absolute inset-0 flex items-center justify-center text-4xl text-blue-600">
          <FaLightbulb />
        </div>
      </motion.div>
      <motion.p
        className="text-2xl font-semibold text-blue-700 mb-4 text-center"
        key={messageIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {messages[messageIndex]}
      </motion.p>
      <motion.div
        className="text-3xl text-blue-500"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ...
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;