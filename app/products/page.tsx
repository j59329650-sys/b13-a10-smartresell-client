'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'; // অ্যানিমেশনের জন্য যুক্ত করা হলো

interface Product {
  _id: string;
  title: string;
  category: string;
  condition: string;
  price: number;
  images: string[];
  description: string;
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('none'); 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; 

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error('Error fetching products:', err))
      .finally(() => setLoading(false));
  }, []);

  // ১. সার্চ এবং ক্যাটাগরি ফিল্টারিং লজিক (Challenge 1)
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // ২. অ্যাডভান্সড সর্টিং লজিক (Challenge 1)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'lowToHigh') return a.price - b.price;
    if (sortBy === 'highToLow') return b.price - a.price;
    return 0;
  });

  // ৩. পেজিনেশন লজিক (Challenge 2)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // রিকোয়ারমেন্ট অনুসারে প্রফেশনাল স্কেলেটন লোডিং (Skeleton Loading for Product Cards)
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 bg-gray-200 rounded-lg w-1/3 mx-auto mb-8 animate-pulse"></div>
          <div className="bg-white p-4 rounded-xl h-16 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl border h-96 p-5 flex flex-col gap-4">
                <div className="bg-gray-200 h-48 w-full rounded-lg animate-pulse"></div>
                <div className="bg-gray-200 h-6 w-1/4 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-6 w-3/4 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-12 w-full rounded animate-pulse mt-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 text-gray-900">
      <div className="max-w-7xl mx-auto">
        
        {/* টাইটেল অ্যানিমেশন */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Explore All Products
        </motion.h1>

        {/* কন্ট্রোল প্যানেল অ্যানিমেশন */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white p-4 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-100"
        >
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 outline-none transition"
          />

          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 outline-none bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Fashion">Fashion</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 outline-none bg-white"
          >
            <option value="none">Sort by Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </motion.div>

        {/* প্রোডাক্ট গ্রিড এবং AnimatePresence ফর স্মুথ পেজিনেশন ট্রানজিশন */}
        {currentProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No products found matching your criteria.</p>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {currentProducts.map((product) => (
                <motion.div
                  layout
                  key={product._id}
                  initial={{ opacity: 0, transform: 'scale(0.9)' }}
                  animate={{ opacity: 1, transform: 'scale(1)' }}
                  exit={{ opacity: 0, transform: 'scale(0.9)' }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }} // হোভার অ্যানিমেশন রিকোয়ারমেন্ট অনুসারে
                  className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      sizes="(max-w-7xl) 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded self-start mb-2">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-1">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="mt-auto flex justify-between items-center pt-3 border-t">
                      <span className="text-xl font-extrabold text-green-700">৳{product.price}</span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded font-medium">
                        {product.condition}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* পেজিনেশন বাটনসমূহ (Challenge 2) */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center gap-2 mt-12"
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 border rounded-lg transition ${
                  currentPage === i + 1 ? 'bg-green-600 text-white font-bold' : 'hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}