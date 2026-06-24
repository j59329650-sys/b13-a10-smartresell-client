'use client';

import { useState } from 'react';

export default function ManageProductsPage() {
  const [products, setProducts] = useState([
    { id: 'P-101', title: 'Used Running Shoes', price: 1800, condition: 'Used' },
    { id: 'P-102', title: 'Gaming Chair', price: 12000, condition: 'Like New' },
  ]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product listing?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Manage All Products (Admin Only)</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600 text-sm font-semibold">
              <th className="p-4">Product ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Condition</th>
              <th className="p-4">Price</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-4 text-gray-500 font-mono">{product.id}</td>
                <td className="p-4 font-semibold text-gray-900">{product.title}</td>
                <td className="p-4 text-xs text-orange-700 font-medium">{product.condition}</td>
                <td className="p-4 font-bold">৳{product.price}</td>
                <td className="p-4">
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-bold py-1.5 px-3 rounded-lg transition"
                  >
                    Delete Listing
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}