'use client';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

const LoginPage = () => {
  const { logIn, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await logIn(email, password); // Firebase login

      toast.success("Logged in successfully!");

      // 🟢 delay দিয়ে redirect করলে 100% কাজ করে
      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 300);

    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      if (!result?.user) return;

      const { uid, displayName, email, photoURL } = result.user;

      await fetch("https://fylo-tech-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, displayName, email, photoURL }),
      });

      toast.success("Logged in with Google!");

      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 300);

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 rounded-2xl p-10 max-w-md w-full shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">
          Login to FyloTech
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-2xl text-white font-semibold transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 p-3 rounded-2xl text-white font-semibold transition"
        >
          Login with Google
        </button>

        <p className="mt-4 text-gray-400 text-center">
          Do not have an account?{' '}
          <Link href="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
