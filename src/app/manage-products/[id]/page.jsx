'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UpdateProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fylo-tech-server.vercel.app/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        toast.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("category", product.category);
      formData.append("price", product.price);
      if(file) formData.append("image", file);

      await axios.put(`https://fylo-tech-server.vercel.app/myproducts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product updated!");
      router.push('/manage-products');
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  if(loading) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-gray-900 text-gray-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          value={product.title || ''}
          onChange={(e) => setProduct({...product, title: e.target.value})}
          placeholder="Title"
          className="p-2 rounded bg-gray-800"
        />
        <input
          type="text"
          value={product.category || ''}
          onChange={(e) => setProduct({...product, category: e.target.value})}
          placeholder="Category"
          className="p-2 rounded bg-gray-800"
        />
        <input
          type="number"
          value={product.price || ''}
          onChange={(e) => setProduct({...product, price: e.target.value})}
          placeholder="Price"
          className="p-2 rounded bg-gray-800"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 rounded bg-gray-800 text-gray-200"
        />
        {product.image && (
          <img src={`http://localhost:5000${product.image}`} alt="Product" className="w-32 h-32 object-cover mt-2"/>
        )}
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}
