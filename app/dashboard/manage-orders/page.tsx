'use client';

import { useState } from 'react';

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState([
    { id: 'ORD-7710', customer: 'Anik Rahman', product: 'Dell Laptop', price: 35000, status: 'Pending' },
    { id: 'ORD-7711', customer: 'Sumi Akter', product: 'Smart Watch', price: 4500, status: 'Shipped' },
  ]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    alert(`Order ${id} status updated to ${newStatus}! 🎉`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Manage All Orders (Admin/Seller)</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600 text-sm font-semibold">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50/50">
                <td className="p-4 font-bold text-emerald-600">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4 font-semibold">{order.product}</td>
                <td className="p-4">৳{order.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded px-2 py-1 bg-white outline-none text-xs text-gray-700"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}