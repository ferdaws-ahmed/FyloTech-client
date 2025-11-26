'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "../../app/context/AuthContext.jsx";

const Register = () => {
  const { register, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState("");

  // ===== Save User to MongoDB =====
  const saveUserToDB = async (userData) => {
    try {
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
    } catch (err) {
      console.error("MongoDB save failed:", err);
    }
  };

  // ===== Handle Password Validation =====
  useEffect(() => {
    if (password.length > 0 && password.length < 6) {
      setPasswordWarning("Password must be at least 6 characters");
    } else {
      setPasswordWarning("");
    }
  }, [password]);

  // ===== Register with Email/Password =====
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await register(email, password, name, photoURL);
      if (userCredential?.user) {
        const user = userCredential.user;

        // save in MongoDB
        await saveUserToDB({
          uid: user.uid,
          name: name,
          email: email,
          photoURL: photoURL || "",
          createdAt: new Date(),
        });

        toast.success("Registration successful!");
        router.push("/");
      }
    } catch (err) {
      toast.error(err.message || "Registration failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ===== Google Login =====
  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      if (result?.user) {
        const user = result.user;

        // Save in MongoDB
        await saveUserToDB({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL || "",
          createdAt: new Date(),
        });

        toast.success("Logged in with Google!");
        router.push("/"); 
      }
    } catch (err) {
      toast.error(err.message || "Google login failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
      <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-xl p-10">
        <h2 className="text-3xl font-extrabold text-blue-400 text-center mb-8">
          FyloTech Registration
        </h2>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-4 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {passwordWarning && (
            <p className="text-red-400 text-sm">{passwordWarning}</p>
          )}
          <input
            type="text"
            placeholder="Photo URL (optional)"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold text-lg"
          >
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>

        <div className="my-4 text-center text-gray-400">or</div>

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-semibold text-lg"
        >
          {loading ? "Please wait..." : "Register / Login with Google"}
        </button>

        {/* Login Link */}
        <p className="mt-6 text-gray-400 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
