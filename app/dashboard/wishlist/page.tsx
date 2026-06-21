import { Heart } from "lucide-react";

export default function WishlistPage() {
  const wishlist = [
    {
      id: 1,
      name: "Gaming Laptop",
      price: "$1200",
    },
    {
      id: 2,
      name: "iPhone 15",
      price: "$950",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Wishlist</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-5"
          >
            <Heart className="text-red-500 mb-3" />

            <h2 className="text-xl font-semibold">
              {item.name}
            </h2>

            <p className="text-gray-500">{item.price}</p>

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}