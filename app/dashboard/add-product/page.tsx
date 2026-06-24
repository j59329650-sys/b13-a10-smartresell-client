'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client'; 

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  
  const { data: session } = authClient.useSession();

 
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    condition: 'Used',
    price: '',
    imageUrl: '', 
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!session?.user) {
      alert('Please log in first!');
      return;
    }

    setLoading(true);

   
    const productPayload = {
      title: formData.title,
      category: formData.category,
      condition: formData.condition,
      price: Number(formData.price),
      images: [formData.imageUrl || "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed"],
      description: formData.description,
      sellerInfo: {
        userId: session.user.id, 
        name: session.user.name, 
        email: session.user.email, 
      },
      status: "available"
    };

    try {
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      
      const res = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productPayload),
      });

      const result = await res.json();

      if (result.success) {
        alert('Product Added Successfully! 🎉');
        
        router.push('/dashboard/my-products'); 
      } else {
        alert('Failed to add product: ' + result.error);
      }
    } catch (error) {
      console.error('Error post product:', error);
      alert('Something went wrong!');
    } finally {
      loading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md my-10 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Product (Seller)</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Product Title *</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Used Dell Inspiron 15"
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 outline-none bg-white"
            >
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Condition *</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 outline-none bg-white"
            >
              <option value="Used">Used</option>
              <option value="Like New">Like New</option>
              <option value="Refurbished">Refurbished</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Price (BDT) *</label>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 35000"
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
          <textarea
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Write details about the product condition, usage period, etc."
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 outline-none resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:bg-gray-400"
        >
          {loading ? 'Uploading...' : 'Publish Product Listing'}
        </button>
      </form>
    </div>
  );
}