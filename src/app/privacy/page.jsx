'use client';

import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="py-20 bg-black text-white w-full px-4">
      <div className="max-w-5xl mx-auto">
        {/* Gradient Title */}
        <h1 className="text-5xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          Privacy Policy
        </h1>

        <p className="text-gray-300 mb-6 text-lg">
          Your privacy is important to us at FyloTech. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
        </p>

        {/* Section Blocks */}
        {[
          {
            title: "1. Information We Collect",
            content:
              "We may collect personal information such as your name, email address, shipping address, payment information, and any other details you provide when making a purchase or subscribing to our newsletter.",
          },
          {
            title: "2. How We Use Your Information",
            content:
              "Your information is used to process orders, provide customer support, send promotional emails, and improve our services. We do not sell or share your personal information with third parties for marketing purposes.",
          },
          {
            title: "3. Cookies & Tracking",
            content:
              "We use cookies and similar technologies to enhance your experience on our website, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings.",
          },
          {
            title: "4. Data Security",
            content:
              "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.",
          },
          {
            title: "5. Third-Party Services",
            content:
              "Our website may use third-party services for payment processing, shipping, and analytics. These providers have their own privacy policies which we recommend reviewing.",
          },
          {
            title: "6. Your Rights",
            content:
              "You have the right to access, update, or delete your personal information. For any privacy-related inquiries, please contact us at ",
            contact: "support@fylotech.com",
          },
          {
            title: "7. Changes to This Policy",
            content:
              "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.",
          },
        ].map((section, index) => (
          <div
            key={index}
            className="bg-gray-900/70 backdrop-blur-md p-6 rounded-2xl mb-6 border border-gray-700 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
            <p className="text-gray-300 text-lg">
              {section.content}
              {section.contact && (
                <span className="text-blue-400">{section.contact}</span>
              )}
            </p>
          </div>
        ))}

        <p className="text-gray-500 mt-6 text-sm text-center">
          Last updated: November 26, 2025
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
