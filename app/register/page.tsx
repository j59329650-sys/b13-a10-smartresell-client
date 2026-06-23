'use client';

import { signUp } from "@/lib/auth-client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("buyer");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await signUp.email({
      email,
      password,
      name,
      data: {
        role: role, 
        plan: "free"
      }
    }, {
      onSuccess: () => {
        alert("Registration Successful!");
        window.location.href = "/dashboard";
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          {/* নাম ইনপুট */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="mt-1 block w-full rounded-md border p-2 text-black" 
              required 
            />
          </div>

          {/* ইমেইল ইনপুট */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-1 block w-full rounded-md border p-2 text-black" 
              required 
            />
          </div>

          {/* পাসওয়ার্ড ইনপুট */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="mt-1 block w-full rounded-md border p-2 text-black" 
              required 
            />
          </div>

          {/* রোল সিলেক্ট (Buyer/Seller) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Register As</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="mt-1 block w-full rounded-md border p-2 text-black"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          {/* সাবমিট বাটন */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 font-semibold transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}