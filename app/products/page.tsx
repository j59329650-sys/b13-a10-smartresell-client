'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
  
  // সার্চ, সর্টিং ও পেজিনেশন স্টেট
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('none'); // lowToHigh, highToLow
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // প্রতি পেজে ৬টি করে প্রোডাক্ট দেখাবে

  useEffect(() => {
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
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
    return 0; // ডিফল্ট (যেমন আছে তেমন)
  });

  // ৩. পেজিনেশন লজಿಕ (Challenge 2)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Explore All Products</h1>

        {/* সার্চ, ফিল্টার এবং সর্টিং কন্ট্রোল প্যানেল */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-100">
          {/* সার্চ ইনপুট */}
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 outline-none"
          />

          {/* ক্যাটাগরি ফিল্টার */}
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Fashion">Fashion</option>
          </select>

          {/* সর্টিং ড্রপডাউন */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 outline-none"
          >
            <option value="none">Sort by Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* প্রোডাক্ট গ্রিড */}
        {currentProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No products found matching your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col h-full">
                <div className="relative h-48 w-full bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
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
              </div>
            ))}
          </div>
        )}

        {/* পেজিনেশন বাটনসমূহ (Challenge 2) */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
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
          </div>
        )}
      </div>
    </div>
  );
}