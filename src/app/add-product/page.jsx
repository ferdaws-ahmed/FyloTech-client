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

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("You must be logged in");

    // Required fields check
    const requiredFields = [
      'title', 'subtitle', 'category', 'image', 'short-description',
      'full-description', 'price', 'ratings'
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        toast.error(`Please fill in the ${field.replace('-', ' ')} field.`);
        return;
      }
    }

    // Price & Ratings numeric validation
    const priceValue = parseFloat(formData.price);
    const ratingsValue = parseFloat(formData.ratings);

    if (isNaN(priceValue) || priceValue <= 0) {
      return toast.error("Price must be a valid number greater than 0");
    }

    if (isNaN(ratingsValue) || ratingsValue < 0 || ratingsValue > 5) {
      return toast.error("Ratings must be a number between 0 and 5");
    }

    const productData = {
      ...formData,
      sellerName: user.displayName || "Anonymous",
      sellerEmail: user.email,
      price: priceValue,
      ratings: ratingsValue,
    };

    try {
      setLoading(true);
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
      
      <form 
        onSubmit={handleAddProduct} 
        className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg"
      >
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
            />
          </div>
          
          {/* Image URL */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Product Image URL"
              className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
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
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition-transform transform hover:scale-[1.02]"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
