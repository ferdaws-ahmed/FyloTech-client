'use client';

import React from "react";

const Sitemap = () => {
  const sections = [
    { title: "Product Collections", description: "Explore our newest tech gadgets, top-rated devices, and exclusive accessories.", color: "from-cyan-400 to-blue-500" },
    { title: "Shipping & Delivery", description: "All details about shipping, delivery times, and package tracking.", color: "from-green-400 to-teal-500" },
    { title: "Customer Support", description: "Return policies, FAQs, and 24/7 support info for our customers.", color: "from-purple-400 to-pink-500" },
    { title: "Company Info", description: "About FyloTech, careers, privacy, and legal information.", color: "from-yellow-400 to-orange-400" },
    { title: "Community & Events", description: "Latest news, blog posts, events, and newsletters.", color: "from-red-400 to-pink-500" },
  ];

  return (
    <section className="w-full py-24 bg-black text-white px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
          FyloTech Sitemap
        </h1>

        {/* Timeline / Cards */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-gray-700"></div>

          <div className="space-y-16">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className={`relative w-full md:w-3/4 mx-auto flex flex-col md:flex-row items-center ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Circle indicator */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg z-10"></div>

                {/* Card */}
                <div className="bg-gray-900/70 backdrop-blur-md p-8 rounded-3xl border border-gray-700 shadow-xl w-full md:w-2/3 hover:scale-105 transform transition-transform duration-300">
                  <h2 className={`text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${section.color}`}>
                    {section.title}
                  </h2>
                  <p className="text-gray-300 text-lg">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-gray-500 mt-20 text-center text-sm">
          © {new Date().getFullYear()} FyloTech. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Sitemap;
