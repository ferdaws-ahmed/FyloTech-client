'use client';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function AddProduct() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: '',
    image: '',
    "short-description": '',
    "full-description": '',
    price: '',
    ratings: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleAddProduct = async () => {
  if (!user) return toast.error("You must be logged in");

  const productData = {
    ...formData,
    sellerName: user.displayName || "Anonymous",
    sellerEmail: user.email,
    price: parseFloat(formData.price),
    ratings: parseFloat(formData.ratings),
  };

  try {
    setLoading(true);
    // Only one POST request
    await axios.post('https://fylo-tech-server.vercel.app/products', productData);

    toast.success("Product added successfully!");
    setFormData({
      title: '',
      subtitle: '',
      category: '',
      image: '',
      "short-description": '',
      "full-description": '',
      price: '',
      ratings: '',
    });
  } catch (err) {
    console.error(err);
    toast.error("Failed to add product");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Add New Product</h2>
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product title"
              className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Subtitle */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Product subtitle"
              className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Product category"
              className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          

          {/* Short Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-semibold">Short Description</label>
            <textarea
              name="short-description"
              value={formData["short-description"]}
              onChange={handleChange}
              placeholder="Brief description of the product"
              className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 resize-none"
              rows={2}
              required
            />
          </div>

          {/* Full Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-semibold">Full Description</label>
            <textarea
              name="full-description"
              value={formData["full-description"]}
              onChange={handleChange}
              placeholder="Detailed description of the product"
              className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 resize-none"
              rows={4}
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Ratings */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Ratings (1-5)</label>
            <input
              type="number"
              name="ratings"
              value={formData.ratings}
              onChange={handleChange}
              placeholder="4.5"
              step="0.1"
              min="0"
              max="5"
              className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddProduct}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition-transform transform hover:scale-[1.02]"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </div>
    </div>
  );
}
