"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { LogOut, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = null; 

  return (
    <div>
      {/* Top Marquee Bar */}
      <div className="bg-emerald-700 p-2 text-white text-sm text-center">
        <marquee scrollamount="4">
          ♻️ SmartResell - টেকসই কেনাকাটা | 🚚 ফাস্ট ডেলিভারি সারা বাংলাদেশে | 💳 সিকিউর পেমেন্ট
        </marquee>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xl">
                ♻️
              </div>
              <div>
                <p className="font-bold text-xl sm:text-2xl text-gray-900 tracking-tight">
                  Smart<span className="text-emerald-600">Resell</span>
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="font-medium text-gray-700 hover:text-emerald-600 transition">Home</Link>
              <Link href="/products" className="font-medium text-gray-700 hover:text-emerald-600 transition">Products</Link>
              <Link href="/categories" className="font-medium text-gray-700 hover:text-emerald-600 transition">Categories</Link>
              <Link href="/dashboard" className="font-medium text-gray-700 hover:text-emerald-600 transition">Dashboard</Link>
              <Link href="/dashboard" className="font-medium text-gray-700 hover:text-emerald-600 transition">About</Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3 sm:gap-4">
                  <Link href="/wishlist" className="hover:text-emerald-600 p-1 transition text-gray-700">
                    <ShoppingCart size={22} />
                  </Link>

                  <div className="relative">
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-1.5 focus:outline-none"
                    >
                      <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-500 relative">
                        <Image 
                          src={(user as any).image} 
                          alt="Profile" 
                          width={36} 
                          height={36} 
                          className="object-cover"
                        />
                      </div>
                      <span className="hidden md:block font-medium text-sm text-gray-700">{(user as any).name}</span>
                      <ChevronDown size={14} className="text-gray-500 hidden md:block" />
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                        <Link 
                          href="/dashboard" 
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                        >
                          <User size={18} />
                          My Profile
                        </Link>
                        <button 
                          onClick={() => {
                            setIsProfileOpen(false);
                            alert('Logout function here');
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-50 mt-1"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-4">
                  <Link 
                    href="/login" 
                    className="font-medium text-gray-700 hover:text-emerald-600 transition"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-medium transition shadow-sm"
                  >
                    Join Now
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-1 rounded-lg hover:bg-gray-100 transition text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile responsive menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 flex flex-col gap-4 text-base font-medium text-gray-700">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-emerald-600 py-1">Home</Link>
              <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-emerald-600 py-1">Products</Link>
              <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="hover:text-emerald-600 py-1">Categories</Link>
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="hover:text-emerald-600 py-1">Dashboard</Link>
              
              <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-center py-2.5 rounded-xl border border-gray-200 font-medium">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="bg-emerald-600 text-white text-center py-2.5 rounded-xl font-medium">
                  Join Now
                </Link>
              </div>
              
                <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      alert('Logout function here');
                    }}
                    className="w-full text-center py-2.5 rounded-xl bg-red-50 text-red-600 font-medium flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;