// app/dashboard/profile/page.js
'use client';

import React, { useState } from 'react';

const ProfilePage = () => {
  // ডামি ইউজার ডেটা (ডাটাবেস বা Better-Auth থেকে আসার মতো স্ট্রাকচার)
  const [user, setUser] = useState({
    name: "Tahmina",
    email: "tahmina.dev@gmail.com",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150", // একটি প্রফেশনাল অ্যাভাটার
    phone: "+8801712345678",
    location: "Dhaka, Bangladesh",
    role: "Seller" // Buyer / Admin হতে পারে
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    // এখানে আপনার ব্যাকএন্ড API-এর কাজ হবে
    setTimeout(() => {
      setIsUpdating(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* হেডার কার্ড */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <img 
            src={user.photo} 
            alt={user.name} 
            className="w-24 h-24 rounded-full object-cover ring-4 ring-green-100"
          />
          <span className="absolute bottom-0 right-0 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow">
            {user.role}
          </span>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <p className="text-gray-400 text-xs mt-1">Account Status: <span className="text-green-500 font-semibold">Active</span></p>
        </div>
      </div>

      {/* প্রোফাইল এডিট ফর্ম */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Profile Settings
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ফুল নেম ইনপুট */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-sm"
                required
              />
            </div>

            {/* ইমেইল (ডিজেবলড থাকবে কারণ ইমেইল সাধারণত চেঞ্জ করা যায় না) */}
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-2">Email Address</label>
              <input 
                type="email" 
                value={user.email}
                disabled
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 cursor-not-allowed text-sm"
              />
            </div>

            {/* ফোন নম্বর ইনপুট */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                value={user.phone}
                onChange={(e) => setUser({...user, phone: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-sm"
              />
            </div>

            {/* লোকেশন/অ্যাড্রেস ইনপুট */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address / Location</label>
              <input 
                type="text" 
                value={user.location}
                onChange={(e) => setUser({...user, location: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-sm"
              />
            </div>
          </div>

          {/* সেভ বাটন */}
          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all text-sm disabled:opacity-50"
            >
              {isUpdating ? 'Saving Changes...' : 'Save Profile Updates'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;