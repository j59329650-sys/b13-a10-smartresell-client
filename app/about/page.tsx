export default function AboutPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            About SmartResell
          </h1>

          <p className="text-lg max-w-3xl mx-auto">
            SmartResell is a trusted marketplace where people can safely
            buy and sell quality second-hand products across Bangladesh.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-green-700">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-8">
              Our mission is to make buying and selling used products
              simple, secure and affordable. We connect buyers and sellers
              through a trusted online platform.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4 text-green-700">
              Why Choose SmartResell?
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li>✅ Safe & Secure Platform</li>
              <li>✅ Fast Product Listing</li>
              <li>✅ Affordable Second-hand Products</li>
              <li>✅ Easy Buyer & Seller Communication</li>
              <li>✅ Modern Dashboard Experience</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div className="shadow rounded-xl p-6">
            <h2 className="text-4xl font-bold text-green-600">500+</h2>
            <p className="text-gray-600 mt-2">Products</p>
          </div>

          <div className="shadow rounded-xl p-6">
            <h2 className="text-4xl font-bold text-green-600">1000+</h2>
            <p className="text-gray-600 mt-2">Users</p>
          </div>

          <div className="shadow rounded-xl p-6">
            <h2 className="text-4xl font-bold text-green-600">250+</h2>
            <p className="text-gray-600 mt-2">Orders</p>
          </div>

          <div className="shadow rounded-xl p-6">
            <h2 className="text-4xl font-bold text-green-600">99%</h2>
            <p className="text-gray-600 mt-2">Customer Satisfaction</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-3">
            SmartResell
          </h2>

          <p className="text-gray-300">
            Buy Smart • Sell Smart • Save Money
          </p>

          <p className="text-gray-500 mt-6">
            © 2026 SmartResell. All Rights Reserved.
          </p>
        </div>
      </section>
    </main>
  );
}