// app/categories/page.js
'use client'; // ইন্টারঅ্যাক্টিভিটি (useState) ব্যবহারের জন্য

import React, { useState } from 'react';

const CategoriesPage = () => {
  // ১. ক্যাটাগরি লিস্ট ডেটা
  const categories = [
    { id: "all", name: "All Products", icon: "🌐", bgColor: "bg-gray-100" },
    { id: "electronics", name: "Electronics", icon: "📱", bgColor: "bg-blue-100" },
    { id: "vehicles", name: "Vehicles & Bikes", icon: "🏍️", bgColor: "bg-green-100" },
    { id: "fashion", name: "Fashion & Clothes", icon: "👕", bgColor: "bg-yellow-100" },
    { id: "home", name: "Home Appliances", icon: "📺", bgColor: "bg-pink-100" },
  ];

  // ২. ডামি প্রোডাক্ট ডেটা (রিসেল মার্কেটের জন্য)
  const productsData = [
    { id: 1, title: "iPhone 13 Pro Max", category: "electronics", price: "75,000 TK", condition: "Excellent", img: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400" },
    { id: 2, title: "Yamaha R15 V3", category: "vehicles", price: "3,20,000 TK", condition: "Used - 1 Year", img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400" },
    { id: 3, title: "Casual Denim Jacket", category: "fashion", price: "1,200 TK", condition: "Like New", img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400" },
    { id: 4, title: "Sony Bravia 4K TV", category: "home", price: "45,000 TK", condition: "Good", img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400" },
    { id: 5, title: "MacBook Air M1", category: "electronics", price: "85,000 TK", condition: "Fresh", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400" },
  ];

  // স্টেট (কোন ক্যাটাগরি সিলেক্টেড আছে তা ট্র্যাক করার জন্য)
  const [selectedCategory, setSelectedCategory] = useState('all');

  // ক্যাটাগরি অনুযায়ী প্রোডাক্ট ফিল্টার করার লজিক
  const filteredProducts = selectedCategory === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50">
      {/* হেডিং */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Browse by Category</h1>
        
      </div>

      {/* ক্যাটাগরি বাটন/কার্ড সেকশন */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`border rounded-xl p-4 text-center shadow-sm cursor-pointer transition-all duration-200 ${
              selectedCategory === category.id 
                ? "border-green-500 ring-2 ring-green-200 bg-green-50 scale-105" 
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className={`w-12 h-12 ${category.bgColor} text-2xl flex items-center justify-center rounded-full mx-auto mb-2`}>
              {category.icon}
            </div>
            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* প্রোডাক্ট ডিসপ্লে সেকশন */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {categories.find(c => c.id === selectedCategory)?.name} Products ({filteredProducts.length})
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center py-10">এই ক্যাটাগরিতে কোনো প্রোডাক্ট পাওয়া যায়নি।</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <img src={product.img} alt={product.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">
                  {product.condition}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-2 truncate">{product.title}</h3>
                <p className="text-xl font-extrabold text-green-600 mt-1">{product.price}</p>
                <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;