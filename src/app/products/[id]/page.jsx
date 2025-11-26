'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Page() {
  const { id } = useParams(); // URL থেকে ID নেওয়া হচ্ছে
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

// src/app/products/[id]/page.jsx
// ...
useEffect(() => {
  // 🛑 যদি ID না থাকে, লোড হতে দিন এবং অপেক্ষা করুন।
  if (!id) {
    console.warn("ID is not yet available, waiting...");
    // Loading false করবেন না, কারণ আমরা এখনও ডেটা ফেচ করিনি।
    return;
  }
  
  console.log("Fetching with confirmed ID:", id); // নিশ্চিত ID লগ করুন

  const fetchProduct = async () => {
    setLoading(true); // যখন ID পাব, তখন লোডিং শুরু হবে।
    try {
      const res = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      // ... error handling ...
      setProduct(null);
    } finally {
      setLoading(false); // ডেটা ফেচ শেষ হলে লোডিং শেষ হবে।
    }
  };

  fetchProduct();
}, [id]); // id চেঞ্জ হলে রি-রান হবে
// ...
  // --- Buy Now Handler ---
  const handleBuyNow = () => {
    if (product) {
      toast.success(`You bought ${product.title} for $${product.price.toFixed(2)}!`);
    }
  };

  // --- Priority Logic ---
  const getPriority = rating => {
    if (rating >= 4.8) return 'High';
    if (rating >= 4.5) return 'Medium';
    return 'Low';
  };

  // --- Loading/Error State Renders ---
  if (loading) return <p className="text-center mt-20 text-gray-400">Loading...</p>;
  // API কল ব্যর্থ হলে বা product না পেলে
  if (!product) return <p className="text-center mt-20 text-red-500 font-bold text-xl">Product not found! Check your ID and API server.</p>;

  // --- Success Render ---
  const addedDate = new Date().toLocaleDateString();

  return (
    <div className="px-4 md:px-12 lg:px-24 py-12 bg-[#0A0A0A] min-h-screen text-gray-200">
      <button
        onClick={() => router.back()}
        className="mb-8 px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition duration-200"
      >
        &larr; Back
      </button>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Product Image Section */}
        <div className="w-full md:w-1/2 relative h-96 rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center shadow-lg">
          {product.image ? (
            <Image 
              src={product.image} 
              alt={product.title} 
              fill 
              className="object-cover transition duration-500 hover:scale-105" 
            />
          ) : (
            <span className="text-gray-500 font-semibold text-lg">No Image</span>
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold text-white leading-tight">{product.title}</h1>
          <h2 className="text-xl text-gray-400 font-light">{product.subtitle}</h2>

          {/* Price, Rating & Priority */}
          <div className="flex items-center gap-4 border-y border-gray-700 py-3 my-2">
            <span className="text-3xl font-bold text-green-400">${product.price.toFixed(2)}</span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-5 h-5 fill-yellow-400" />
              <span className="font-semibold">{product.ratings}</span>
            </div>
            <span className="ml-4 px-3 py-1 bg-purple-600 rounded-full text-xs font-medium uppercase text-white">
              Priority: {getPriority(product.ratings)}
            </span>
          </div>

          {/* Description and Date */}
          <p className="text-gray-300 leading-relaxed text-base">{product['full-description']}</p>
          <p className="text-gray-500 text-sm mt-2">Added on: {addedDate}</p>

          {/* Buy Now Button */}
          <button
            onClick={handleBuyNow}
            className="mt-6 w-full md:w-2/3 lg:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-blue-500/50 shadow-md transition-all duration-300 transform hover:scale-[1.02]"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}