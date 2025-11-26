'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Lightbulb, Globe } from 'lucide-react';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 px-6 md:px-16 lg:px-24 py-16">
      
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4
                       bg-clip-text text-transparent
                       bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          About Us
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
          FyloTech is dedicated to bringing the latest in tech innovation and gadgets right to your fingertips. 
          We focus on quality, performance, and providing our users with an unforgettable experience.
        </p>
      </header>

      {/* Features Section */}
      <div className="grid gap-12 md:grid-cols-3 text-center">
        {/* Team */}
        <div className="bg-gray-900 rounded-xl p-8 flex flex-col items-center hover:shadow-lg hover:shadow-blue-500/40 transition-shadow duration-300">
          <Users className="w-16 h-16 text-blue-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-white">Our Team</h2>
          <p className="text-gray-400">
            A passionate group of developers, designers, and innovators working together to bring the best tech solutions to our users.
          </p>
        </div>

        {/* Innovation */}
        <div className="bg-gray-900 rounded-xl p-8 flex flex-col items-center hover:shadow-lg hover:shadow-purple-500/40 transition-shadow duration-300">
          <Lightbulb className="w-16 h-16 text-purple-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-white">Innovation</h2>
          <p className="text-gray-400">
            We constantly research and innovate to ensure our products are cutting-edge, practical, and designed for real-world needs.
          </p>
        </div>

        {/* Global Reach */}
        <div className="bg-gray-900 rounded-xl p-8 flex flex-col items-center hover:shadow-lg hover:shadow-pink-500/40 transition-shadow duration-300">
          <Globe className="w-16 h-16 text-pink-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-white">Global Reach</h2>
          <p className="text-gray-400">
            Our products reach tech enthusiasts all over the world, creating a global community connected by innovation.
          </p>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Join Our Tech Journey
        </h2>
        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
          Whether you are a creator, gamer, or tech enthusiast, FyloTech has something to inspire and empower you.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
  <Link href="/products">Explore Products</Link>
</button>
      </div>

    </div>
  );
};

export default AboutUs;
