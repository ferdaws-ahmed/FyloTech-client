'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Form submission logic (API/Firebase) এখানে যাবে
    console.log(formData);

    // Toast show
    toast.success('Your message has been sent!');

    // Clear form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 px-4 md:px-12 lg:px-24 py-12 flex flex-col items-center">
      <Toaster position="top-right" reverseOrder={false} />
      
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Contact Us
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have questions or want to get in touch? Fill out the form below and we’ll get back to you as soon as possible.
        </p>
      </header>

      <div className="w-full max-w-3xl bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex-1 flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-semibold text-white mb-4">Get in Touch</h2>
          <p>
            <strong>Email:</strong> support@fylotech.com
          </p>
          <p>
            <strong>Phone:</strong> +880 1XXXXXXXXX
          </p>
          <p>
            <strong>Address:</strong> 123 Tech Avenue, Dhaka, Bangladesh
          </p>
          <p className="text-gray-400 mt-4">
            We’re available Monday to Friday, 9am to 6pm.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
