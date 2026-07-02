"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

const SignupPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      await signUp.email(
        {
          name: username,
          email,
          password,
          data: {
            role,
          },
        },
        {
          onSuccess: () => {
            alert("Registration Successful!");
            router.push("/login");
            router.refresh();
          },

          onError: (ctx) => {
            alert(ctx.error.message);
          },
        }
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left */}
        <div className="hidden md:flex bg-gradient-to-br from-emerald-600 to-teal-700 text-white items-center justify-center p-10">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Join SmartResell
            </h1>

            <p className="text-emerald-100">
              Buy and Sell your products safely with SmartResell.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="p-8 md:p-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Create Account
          </h2>

          <form
            onSubmit={handleSignup}
            className="space-y-4"
          >
            <div>
              <label className="text-sm text-gray-700">
                Username
              </label>

              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-xl p-3 mt-1 text-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-xl p-3 mt-1 text-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-xl p-3 mt-1 text-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-xl p-3 mt-1 text-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">
                Register As
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded-xl p-3 mt-1 text-black"
              >
                <option value="buyer">
                  Buyer
                </option>

                <option value="seller">
                  Seller
                </option>
              </select>
            </div>

            <button
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 font-semibold"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-600 font-semibold"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignupPage;