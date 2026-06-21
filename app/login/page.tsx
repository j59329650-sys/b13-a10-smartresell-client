"use client";

import React, { useState } from "react";
import { useAuth } from '@/context/AuthContext'; // আপনার পাথ অনুযায়ী ঠিক রাখবেন

const LoginPage = () => {
  const auth = useAuth();
  
  // ফর্ম ডাটা স্টেট হ্যান্ডেল করার জন্য
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const { loginWithGoogle, loading } = auth;

  // ইমেইল এবং পাসওয়ার্ড দিয়ে লগইনের সাবমিট ফাংশন
  // ২৪ নম্বর লাইনের handleEmailLogin ফাংশনটি সরিয়ে এটি বসান:
  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      // আপনার ব্যাকএন্ডের সঠিক URL-টি এখানে দিন (যেমন: http://localhost:5000/users/login)
     // ইমেইলটি ডাইনামিকালি পাঠাতে ব্যাকটিক (``) ব্যবহার করুন
const response = await fetch(`http://localhost:5000/users/${email}`, {
  method: "PUT", // আপনার ব্যাকএন্ডে PUT দেওয়া আছে
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "User Name", email, photo: "" }), // ব্যাকএন্ডের req.body অনুযায়ী ডেটা
});

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful!");
        console.log("Logged in user data:", data);
        // যদি ব্যাকএন্ড থেকে টোকেন দেয়, তা লোকাল স্টোরেজে রাখতে পারেন:
        // localStorage.setItem("token", data.token);
      } else {
        alert(data.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] p-4 md:p-10">
      {/* মেইন কন্টেইনার কার্ড */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[550px]">
        
        {/* বাম পাশ: ইলাস্ট্রেশন/ছবি সেকশন (bg-gradient-to-br ফিক্স করা হয়েছে) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-700 items-center justify-center p-12 text-white relative">
          <div className="space-y-6 text-center z-10">
            <h1 className="text-4xl font-extrabold tracking-tight">SmartResell</h1>
            <p className="text-emerald-100 text-sm max-w-sm mx-auto">
              The most reliable and modern platform to buy and sell your pre-owned items safely.
            </p>
            {/* ইলাস্ট্রেশনের ডামী গ্রাফিক্স */}
            <div className="w-64 h-64 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm mt-8 border border-white/20 shadow-inner">
              <span className="text-7xl">🤝</span>
            </div>
          </div>
          {/* ব্যাকগ্রাউন্ডের ডিজাইন সার্কেল */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
        </div>

        {/* ডান পাশ: লগইন ফর্ম সেকশন */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            {/* হেডার */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-sm text-gray-500 mt-2">Please sign in to your account</p>
            </div>

            {/* লগইন ফর্ম */}
            <form onSubmit={handleEmailLogin} className="space-y-5">
              {/* ইমেইল ফিল্ড */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800 outline-none transition-all"
                />
              </div>

              {/* পাসওয়ার্ড ফিল্ড */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800 outline-none transition-all"
                />
              </div>

              {/* রিমেম্বার মি ও ফরগট পাসওয়ার্ড */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500 mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-sm font-medium text-emerald-600 hover:underline">Forgot password?</a>
              </div>

              {/* সাইন ইন বাটন */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-emerald-200"
              >
                Sign In
              </button>
            </form>

            {/* ডিভাইডার (flex-grow ফিক্স করা হয়েছে) */}
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* গুগল লগইন বাটন */}
            <button
              onClick={loginWithGoogle}
              disabled={loading}
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </div>
              ) : (
                <>
                  {/* গুগল আইকন SVG */}
                  <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="font-semibold text-gray-700">Continue with Google</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;