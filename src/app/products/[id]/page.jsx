'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get('/products.json');
        const found = res.data.find(p => p.id === parseInt(id));
        setProduct(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
     toast.success(`You bought ${product.title} for $${product.price.toFixed(2)}!`)
  };

  if (loading) return <p className="text-center mt-20 text-gray-400">Loading...</p>;
  if (!product) return <p className="text-center mt-20 text-red-500">Product not found!</p>;

  const addedDate = new Date().toLocaleDateString();
  const getPriority = rating => {
    if (rating >= 4.8) return 'High';
    if (rating >= 4.5) return 'Medium';
    return 'Low';
  };

  return (
    <div className="px-4 md:px-12 lg:px-24 py-12 bg-[#0A0A0A] min-h-screen text-gray-200">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-8 px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium"
      >
        &larr; Back
      </button>

      {/* Product Details Flex */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Image Left */}
        <div className="w-full md:w-1/2 relative h-96 rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
          {product.image ? (
            <Image src={product.image} alt={product.title} fill className="object-cover" />
          ) : (
            <span className="text-gray-500 font-semibold text-lg">No Image</span>
          )}
        </div>

        {/* Info Right */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-white">{product.title}</h1>
          <h2 className="text-xl text-gray-400">{product.subtitle}</h2>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>{product.ratings}</span>
            </div>
            <span className="ml-4 px-2 py-1 bg-gray-700 rounded-full text-sm">
              Priority: {getPriority(product.ratings)}
            </span>
          </div>

          <p className="text-gray-300">{product['full-description']}</p>
          <p className="text-gray-500 text-sm">Added on: {addedDate}</p>

          <button
            onClick={handleBuyNow}
            className="mt-4 w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
