"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();

  return (
    <div className="bg-white p-8 rounded-2xl border shadow-sm max-w-4xl">
      <h1 className="text-3xl font-extrabold text-slate-800">
        Welcome to your Dashboard Overview, {session?.user?.name || "User"}! 🎉
      </h1>
      <p className="text-slate-500 mt-2 text-base">
       "You can now manage your account statistics, sales, and order information right from here."
      </p>

     
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <div className="bg-slate-50 p-6 rounded-xl border">
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Total Activity</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">Active</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl border">
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Account Role</h3>
          <p className="text-2xl font-bold text-emerald-600 capitalize mt-1">
            {session?.user?.role || "Buyer"}
          </p>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl border">
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Verified User</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">Yes</p>
        </div>
      </div>
    </div>
  );
}