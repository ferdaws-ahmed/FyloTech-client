'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is FyloTech?",
    answer:
      "FyloTech is a cutting-edge tech marketplace offering a wide range of innovative gadgets and smart devices."
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Shipping charges may vary depending on the destination."
  },
  {
    question: "How can I track my order?",
    answer:
      "After placing an order, you will receive a tracking number via email to monitor your shipment."
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most products. Some items may have exceptions."
  },
  {
    question: "Do you provide warranty on products?",
    answer:
      "Yes, all products come with manufacturer warranty. Details vary depending on the product."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = index => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 px-4 md:px-12 lg:px-24 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have questions? Find answers to the most commonly asked questions below.
        </p>
      </header>

      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl p-5 cursor-pointer hover:ring-1 hover:ring-blue-500 transition-all duration-300"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                {faq.question}
              </h3>
              <span className="text-blue-400">
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-400 transition-all duration-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
