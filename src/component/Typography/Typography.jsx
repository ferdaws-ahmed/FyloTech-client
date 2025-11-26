'use client';

import React, { useState, useEffect } from 'react';
import './typewriter.css';
import { motion } from 'framer-motion';
import Link from 'next/link';

const phrases = [
  'Innovate with FyloTech',
  'Smart Living Solutions',
  'Next-Gen Gadgets',
  'Future of Technology',
  'Connect, Explore, Experience',
  'Cutting-edge Devices',
  'Tech Made Simple'
];

const Typography = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    const speed = isDeleting ? 40 : 100;

    const timer = setTimeout(() => {
      setDisplayText(prev => 
        isDeleting 
          ? currentPhrase.substring(0, prev.length - 1) 
          : currentPhrase.substring(0, prev.length + 1)
      );

      // If typing finished, start deleting after a pause
      if (!isDeleting && displayText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1000);
      }

      // If deleting finished, move to next phrase
      if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <section className="w-full mt-10 p-6 bg-gray-900 rounded-2xl min-h-[450px] flex flex-col items-center justify-center">

      {/* Typewriter H2 with gradient */}
      <motion.h2
        className="text-center text-5xl font-extrabold font-poppins bg-clip-text text-transparent gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {displayText}
        <span className="inline-block animate-blink ml-1">|</span>
      </motion.h2>

      {/* Paragraph with flowing gradient */}
      <motion.p
        className="mt-6 text-center max-w-2xl text-lg font-medium flowing-gradient-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        Explore our collection of innovative technology products and solutions that redefine modern living. Experience the future today.
      </motion.p>

      {/* Button */}
      <motion.button
        className="mt-10 px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-500 text-white shadow-lg font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
       <Link href={'/products'}> Explore Products</Link>
      </motion.button>
    </section>
  );
};

export default Typography;
