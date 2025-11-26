'use client';

import React from "react";

const ReturnExchangePolicy = () => {
  return (
    <section className="py-20 bg-black text-white w-full px-4">
      <div className="max-w-5xl mx-auto">
        {/* Gradient Title */}
        <h1 className="text-5xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
          Return & Exchange Policy
        </h1>

        <p className="text-gray-300 mb-6 text-lg">
          At FyloTech, we value customer satisfaction. This Return & Exchange Policy explains the process, conditions, and guidelines for returning or exchanging products purchased from our website.
        </p>

        {/* Policy Sections */}
        {[
          {
            title: "1. Return Eligibility",
            content:
              "Products must be returned within 14 days of delivery. Items should be unused, in original packaging, and include all accessories, manuals, and tags.",
          },
          {
            title: "2. Non-Returnable Items",
            content:
              "Certain items are non-returnable, including gift cards, downloadable software, and personalized/customized products.",
          },
          {
            title: "3. Exchange Process",
            content:
              "To exchange a product, please contact our support team with your order ID and reason for exchange. Once approved, we will guide you through the return and replacement process.",
          },
          {
            title: "4. Refunds",
            content:
              "Refunds will be processed within 7–10 business days after we receive the returned item. Refunds will be issued to the original payment method.",
          },
          {
            title: "5. Shipping Costs",
            content:
              "Return shipping costs are the responsibility of the customer unless the item is defective or incorrect. We recommend using a trackable shipping service.",
          },
          {
            title: "6. Damaged or Defective Items",
            content:
              "If you receive a damaged or defective product, please contact us immediately with photos for verification. We will arrange a replacement or full refund.",
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

export default ReturnExchangePolicy;
