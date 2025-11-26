'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products');
        if (res.data && Array.isArray(res.data)) {
          // Filter only products with rating >= 4.5
          const filtered = res.data.filter(p => p.ratings >= 4.5);

          // Sort by ratings descending
          const sorted = filtered.sort((a, b) => b.ratings - a.ratings);

          // Take top 6
          setProducts(sorted.slice(0, 6));
        }
      } catch (err) {
        console.error('Failed to load products', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="px-4 md:px-12 lg:px-24 py-12 bg-[#0A0A0A] text-gray-200">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Popular Products
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Top rated tech products curated for you
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <div
            key={product._id}
            className="bg-gray-900 rounded-xl shadow-md overflow-hidden flex flex-col relative transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-102 hover:shadow-[0_0_25px_rgba(0,150,255,0.5)] hover:ring-1 hover:ring-blue-400"
          >
            <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-t from-blue-500/10 via-transparent to-transparent opacity-0 hover:opacity-20 transition-opacity duration-500"></div>

            <div className={`relative h-48 w-full ${!product.image ? 'bg-gray-800 flex items-center justify-center' : ''}`}>
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              ) : (
                <span className="text-gray-500 font-semibold text-lg">No Image</span>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-1">{product.title}</h3>
                <p className="text-gray-400 mb-2">{product['short-description'] || 'No description'}</p>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xl font-bold text-white">${product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-400">{product.ratings}</span>
                  </div>
                </div>
              </div>
              <button
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
                onClick={() => router.push(`/products/${product._id}`)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-12">
          No popular products found.
        </p>
      )}
    </section>
  );
};

export default PopularProducts;
