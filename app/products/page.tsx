"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  category: string;
  condition: string;
  price: number;
  images: string[];
  description: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        console.log("Products:", data);

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Explore All Products
      </h1>

      {products.length === 0 ? (
        <h2 className="text-center text-gray-500">
          No Products Found
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl shadow p-4"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <h2 className="text-xl font-bold mt-4">
                {product.title}
              </h2>

              <p className="text-gray-600">
                {product.description}
              </p>

              <p className="mt-2">
                <strong>Category:</strong> {product.category}
              </p>

              <p>
                <strong>Condition:</strong> {product.condition}
              </p>

              <p className="text-2xl font-bold text-green-600 mt-2">
                ৳ {product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}