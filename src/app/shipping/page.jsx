'use client';

import React from "react";

const ShippingInfo = () => {
  return (
    <section className="py-20 bg-black text-white w-full px-4">
      <div className="max-w-5xl mx-auto">
        {/* Gradient Title */}
        <h1 className="text-5xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
          Shipping Information
        </h1>

        <p className="text-gray-300 mb-6 text-lg text-center">
          At FyloTech, we strive to deliver your tech products quickly, safely, and efficiently. Here’s everything you need to know about our shipping process.
        </p>

        {/* Shipping Info Sections */}
        {[
          {
            title: "1. Shipping Methods",
            content:
              "We offer standard, express, and same-day shipping (where available). Shipping fees vary depending on your location and chosen method.",
          },
          {
            title: "2. Delivery Time",
            content:
              "Standard shipping typically takes 3-7 business days. Express shipping takes 1-3 business days. Exact delivery times may vary based on your location.",
          },
          {
            title: "3. Tracking Your Order",
            content:
              "Once your order is shipped, you will receive a tracking number via email to monitor your shipment in real-time.",
          },
          {
            title: "4. International Shipping",
            content:
              "We offer international shipping to select countries. Additional customs duties or taxes may apply depending on the destination.",
          },
          {
            title: "5. Shipping Restrictions",
            content:
              "Certain products may have restrictions based on location or regulations. Please check product details before placing your order.",
          },
          {
            title: "6. Lost or Delayed Packages",
            content:
              "If your package is lost or delayed, please contact our support team. We will work with the courier to resolve the issue as quickly as possible.",
          },
        ].map((section, index) => (
          <div
            key={index}
            className="bg-gray-900/70 backdrop-blur-md p-6 rounded-2xl mb-6 border border-gray-700 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
            <p className="text-gray-300 text-lg">{section.content}</p>
          </div>
        ))}

        <p className="text-gray-500 mt-6 text-sm text-center">
          Last updated: November 26, 2025
        </p>
      </div>
    </section>
  );
};

export default ShippingInfo;
