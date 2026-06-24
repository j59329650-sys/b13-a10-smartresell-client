"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AddProductPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Electronics",
    condition: "Used",
    price: "",
    imageUrl: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user) {
      alert("Please login first!");
      return;
    }

    setLoading(true);

    try {
      const productPayload = {
        title: formData.title,
        category: formData.category,
        condition: formData.condition,
        price: Number(formData.price),
        images: [
          formData.imageUrl ||
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
        ],
        description: formData.description,
        sellerInfo: {
          userId: session.user.id,
          name: session.user.name,
          email: session.user.email,
        },
        status: "available",
        createdAt: new Date(),
      };

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5001";

      const response = await fetch(
        `${apiUrl}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productPayload),
        }
      );

      const result = await response.json();

      console.log(result);

      if (result.insertedId || result.acknowledged) {
        alert("✅ Product Added Successfully!");

        setFormData({
          title: "",
          category: "Electronics",
          condition: "Used",
          price: "",
          imageUrl: "",
          description: "",
        });

        router.push("/dashboard/my-products");
      } else {
        alert("❌ Failed to add product");
      }
    } catch (error) {
      console.error("Add Product Error:", error);
      alert("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Add Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Fashion">Fashion</option>
        </select>

        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="Used">Used</option>
          <option value="Like New">Like New</option>
          <option value="Refurbished">Refurbished</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}