'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation'; 

export default function ManageProducts() {
  const { user } = useAuth();
  const router = useRouter(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserProducts = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axios.get(`https://fylo-tech-server.vercel.app/myproducts/${user.email}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProducts();
  }, [user]);

 const handleDelete = async (id) => {
  if (!confirm("Are you sure?")) return;

  try {
    // Delete from both collections
    await axios.delete(`https://fylo-tech-server.vercel.app/products/${id}`);
    await axios.delete(`https://fylo-tech-server.vercel.app/myproducts/${id}`);

    // Remove from UI list
    setProducts(prev => prev.filter(p => p._id !== id));

    toast.success("Product deleted successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete product");
  }
};


  //  Updated handleUpdate
  const handleUpdate = (id) => {
    router.push(`/manage-products/${id}`); 
  };

  if (loading) return <p className="text-center mt-20 text-gray-400">Loading...</p>;

  return (
    <div className="p-8 bg-gray-900 text-gray-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Manage Your Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-left">
            <tr>
              <th className="px-4 py-2 border-b border-gray-700">Title</th>
              <th className="px-4 py-2 border-b border-gray-700">Category</th>
              <th className="px-4 py-2 border-b border-gray-700">Price</th>
              <th className="px-4 py-2 border-b border-gray-700">Ratings</th>
              <th className="px-4 py-2 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? products.map(p => (
              <tr key={p._id} className="hover:bg-gray-800 transition-colors">
                <td className="px-4 py-2 border-b border-gray-700">{p.title}</td>
                <td className="px-4 py-2 border-b border-gray-700">{p.category}</td>
                <td className="px-4 py-2 border-b border-gray-700">${p.price}</td>
                <td className="px-4 py-2 border-b border-gray-700">{p.ratings}</td>
                <td className="px-4 py-2 border-b border-gray-700 flex gap-2">
                  <button  onClick={() => router.push(`/products/${p._id}`)}
                          className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-md text-sm">
                    View
                  </button>
                  <button onClick={() => handleUpdate(p._id)}
                          className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded-md text-sm">
                    Update
                  </button>
                  <button onClick={() => handleDelete(p._id)}
                          className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded-md text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No products added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
