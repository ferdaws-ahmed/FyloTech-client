'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = async (email, password, displayName, photoURL) => {
    if (password.length < 6) {
      
      return null;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update displayName and photoURL
      await updateProfile(userCredential.user, {
        displayName: displayName || "",
        photoURL: photoURL || "",
      });

      toast.success("Account created successfully!");
      return userCredential;  // ✅ important for component to use
    } catch (error) {
     
      throw error; // throw for component to catch if needed
    }
  };

  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      return userCredential;
    } catch (error) {
      
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      return result;
    } catch (error) {
      
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      
    } catch (error) {
      
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logIn, register, loginWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
