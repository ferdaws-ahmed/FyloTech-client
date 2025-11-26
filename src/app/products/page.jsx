'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../../component/Loading/LoadingSpinner'; 

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const router = useRouter();

  const categories = [
    'all',
    'smartphone',
    'laptop',
    'drone',
    'gaming accessories',
    'smart home devices',
    'hacking',
    'futuristic gadget'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 
      try {
        const res = await axios.get('http://localhost:5000/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = categoryFilter === 'all' ? true : product.category === categoryFilter;
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (!search) return a.title.localeCompare(b.title);
      const aMatch = a.title.toLowerCase().includes(search.toLowerCase());
      const bMatch = b.title.toLowerCase().includes(search.toLowerCase());
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return a.title.localeCompare(b.title);
    });

  if (loading) return <LoadingSpinner fullScreen={true} message="Loading products..." />;

  return (
    <div className="px-4 md:px-12 lg:px-24 py-12 bg-[#0A0A0A] min-h-screen text-gray-200">
      {/* Page Title */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          FyloTech Products
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our wide range of tech products. Filter by category or search by name to find what you need.
        </p>
      </header>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="w-full md:w-1/4 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map(product => (
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
                <h2 className="text-2xl font-semibold text-white mb-1">{product.title}</h2>
                <p className="text-gray-400 mb-2">{product['short-description'] || 'No description'}</p>
                <p className="text-sm text-gray-500 mb-2">
                  Category: <span className="font-medium capitalize">{product.category}</span>
                </p>
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

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-12">No products found for this search/filter.</p>
      )}
    </div>
  );
};

export default ProductsPage;
