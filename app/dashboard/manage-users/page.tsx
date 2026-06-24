'use client';

import { useState } from 'react';

export default function ManageUsersPage() {
  const [users, setUsers] = useState([
    { id: 'U-01', name: 'Tanvir Hasan', email: 'tanvir@gmail.com', role: 'buyer' },
    { id: 'U-02', name: 'Fariha Islam', email: 'fariha@gmail.com', role: 'seller' },
  ]);

  const toggleRole = (id: string, currentRole: string) => {
    const newRole = currentRole === 'buyer' ? 'admin' : 'buyer';
    setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
    alert(`User role updated to ${newRole} successfully!`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Manage Users (Admin Only)</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600 text-sm font-semibold">
              <th className="p-4">User ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Current Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4 text-gray-500">{user.id}</td>
                <td className="p-4 font-semibold">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-slate-100 border text-slate-700 rounded-md text-xs font-bold capitalize">
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => toggleRole(user.id, user.role)}
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-1 px-3 rounded transition"
                  >
                    Make {user.role === 'buyer' ? 'Admin' : 'Buyer'}
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