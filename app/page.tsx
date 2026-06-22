"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Next.js Optimized Image Component
import { motion } from "framer-motion";
import BannerSlider from "./components/BannerSlider";

// Framer Motion Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// ডাটা টাইপ ডিফাইন করা (TypeScript)
interface Category {
  name: string;
  icon: string;
  count: string;
}

interface Product {
  _id: string; 
  title: string;
  price: number; 
  category: string;
  condition: string;
  images: string[]; 
  description: string;
}

interface Story {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

interface TopSeller {
  name: string;
  rating: string;
  sales: string;
  badge: string;
}

// স্ট্যাটিক ও ডামি ডাটা
const categories: Category[] = [
  { name: "Electronics", icon: "💻", count: "1.2k+ Items" },
  { name: "Furniture", icon: "🛋️", count: "850+ Items" },
  { name: "Vehicles", icon: "🚗", count: "430+ Items" },
  { name: "Fashion", icon: "👕", count: "2.5k+ Items" },
  { name: "Mobile Phones", icon: "📱", count: "1.8k+ Items" },
];

const stories: Story[] = [
  { id: 1, name: "Tahmina", role: "Seller", text: "I sold my old laptop on SmartResell in just three days for a great price!", avatar: "👩‍💼" },
  { id: 2, name: "Rahat", role: "Buyer", text: "I found a study table in excellent condition well within my budget. Truly amazing service!", avatar: "👨‍💻" },
];

const topSellers: TopSeller[] = [
  { name: "Anisur Rahman", rating: "⭐ 4.9", sales: "120+ Sales", badge: "Trusted" },
  { name: "Fatima Akter", rating: "⭐ 4.8", sales: "85+ Sales", badge: "Top Rated" },
];

export default function HomePage() {
  // ডাটাবেস থেকে আসা প্রোডাক্ট রাখার স্টেট
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ব্যাকএন্ড API থেকে ডায়নামিক ডাটা ফেচ করা
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        // ১. যদি ডাটা অবজেক্টের ভেতর .success এবং .data থাকে
        if (data && data.success && Array.isArray(data.data)) {
          setLatestProducts(data.data.slice(0, 4));
        } 
        // ২. যদি ব্যাকএন্ড সরাসরি প্রোডাক্টের অ্যারে পাঠায় 
        else if (Array.isArray(data)) {
          setLatestProducts(data.slice(0, 4));
        }
      })
      .catch((err) => console.error("Error fetching homepage products:", err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="bg-[#F9FAFB] min-h-screen text-gray-800 font-sans overflow-x-hidden">
      
      {/* 1. HERO BANNER SECTION */}
      <BannerSlider/>

      {/* 2. POPULAR CATEGORIES */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular Categories</h2>
          <p className="text-gray-500 text-sm mt-1">Explore items by category</p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {categories.map((cat, i) => (
            <motion.div 
              key={i} 
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center cursor-pointer transition-shadow hover:shadow-md"
            >
              <span className="text-4xl block mb-3">{cat.icon}</span>
              <h3 className="font-bold text-gray-800 text-base">{cat.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{cat.count}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. FEATURED PRODUCTS (ডায়নামিক কালেকশন) */}
      <section className="py-16 bg-white border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Featured Products</h2>
              <p className="text-gray-500 text-sm mt-1">Freshly uploaded by our community</p>
            </div>
            <Link href="/products" className="text-emerald-600 font-semibold hover:underline text-sm">View All →</Link>
          </div>

          {loading ? (
            // লোডিং কন্ডিশন
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : latestProducts.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No products found in the database. Add some from the seller dashboard!</p>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {latestProducts.map((product) => (
                <motion.div 
                  key={product._id}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/60 p-4 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all h-full"
                >
                  {/* Next.js Optimized Image Component ব্যবহার করা হয়েছে */}
                  <div className="relative h-40 w-full bg-white rounded-xl shadow-inner mb-4 overflow-hidden">
                    <Image
                      src={product.images[0] || "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{product.category}</span>
                      <span className="text-[11px] font-medium bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">{product.condition}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-base line-clamp-1">{product.title}</h3>
                    <p className="text-emerald-700 font-extrabold text-lg mt-1">{product.price.toLocaleString()} BDT</p>
                  </div>
                  <Link href={`/products/${product._id}`} className="w-full">
                    <button className="w-full mt-4 bg-emerald-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-emerald-700 transition-colors">
                      View Details
                    </button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* EXTRA SECTION 1: SUSTAINABILITY IMPACT */}
      <section className="py-16 bg-emerald-50/60">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-3xl">🌱</span>
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Our Sustainability Impact</h2>
          <p className="text-emerald-800/80 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            "Buying and selling second-hand goods doesn't just save money—it also protects our environment. Every resale reduces e-waste and directly cuts down the carbon footprint. Build a greener planet with SmartResell."
          </p>
          <div className="pt-2 text-emerald-700 font-semibold text-sm">
            🌍 Together we reduced 12,000+ kg of waste this month!
          </div>
        </div>
      </section>

      {/* 4. SUCCESS STORIES */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Success Stories</h2>
          <p className="text-gray-500 text-sm mt-1">Hear from our lovely buyers & sellers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {stories.map((story) => (
            <div key={story.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-start">
              <div className="text-4xl p-3 bg-gray-50 rounded-xl shadow-inner">{story.avatar}</div>
              <div>
                <h4 className="font-bold text-gray-800">{story.name} <span className="text-xs font-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded ml-2">{story.role}</span></h4>
                <p className="text-gray-600 text-sm mt-2 italic">"{story.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXTRA SECTION 2: TRUSTED SELLERS SHOWCASE */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">🛡️ Trusted Sellers Showcase</h2>
            <p className="text-gray-500 text-sm mt-1">Buy with 100% confidence from top-rated members</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {topSellers.map((seller, i) => (
              <div key={i} className="bg-gray-50 p-5 rounded-2xl border border-gray-200/80 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                    {seller.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{seller.name}</h4>
                    <p className="text-xs text-gray-400">{seller.sales}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded block mb-1">{seller.badge}</span>
                  <span className="text-xs font-semibold text-gray-600">{seller.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MARKETPLACE STATISTICS */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">SmartResell by the Numbers</h2>
            <p className="text-gray-400 text-sm mt-1">Real-time platform growth overview</p>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-3xl md:text-5xl font-extrabold text-emerald-400">25,000+</p>
              <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400 font-medium">Total Products</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-3xl md:text-5xl font-extrabold text-emerald-400">4,800+</p>
              <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400 font-medium">Total Sellers</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-3xl md:text-5xl font-extrabold text-emerald-400">18,500+</p>
              <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400 font-medium">Total Buyers</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-3xl md:text-5xl font-extrabold text-emerald-400">12,300+</p>
              <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400 font-medium">Completed Orders</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}