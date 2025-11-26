'use client';

import React from "react";
import { Truck, CheckCircle, Headset, Shield } from "lucide-react";

const features = [
  {
    icon: <Truck size={32} className="text-blue-500" />,
    title: "Fast Shipping",
    description: "Get your tech products delivered quickly and safely to your doorstep."
  },
  {
    icon: <CheckCircle size={32} className="text-green-500" />,
    title: "Quality Products",
    description: "We offer only verified and high-quality tech gadgets from trusted brands."
  },
  {
    icon: <Headset size={32} className="text-purple-500" />,
    title: "24/7 Support",
    description: "Our support team is available round-the-clock to assist you with any query."
  },
  {
    icon: <Shield size={32} className="text-yellow-500" />,
    title: "Secure Payments",
    description: "All transactions are secured with advanced encryption for your safety."
  },
];

const WhyChooseFyloTech = () => {
  return (
    <section className="py-20 bg-gray-900 text-white w-full mt-10 rounded-2xl">
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl font-bold mb-4">Why Choose FyloTech?</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Innovation, quality, and customer satisfaction in every gadget we offer.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow-md"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseFyloTech;
