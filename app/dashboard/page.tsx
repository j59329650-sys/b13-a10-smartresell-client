"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

 
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

 
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  
  if (!session) return null;

 
  const userRole = (session.user as { role?: string }).role || "buyer";

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
        Welcome to your Dashboard Overview, {session.user?.name || "User"}! 🎉
      </h1>
      <p className="text-slate-500 mt-2 text-sm md:text-base">
        You can now manage your account statistics, sales, and order information right from here.
      </p>

     
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        
        <div className="bg-slate-50 p-6 rounded-xl border transition-all hover:shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Activity</h3>
          <p className="text-2xl font-bold text-slate-800 mt-2">Active</p>
        </div>

        {/* রোল কার্ড */}
        <div className="bg-slate-50 p-6 rounded-xl border transition-all hover:shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Role</h3>
          <p className="text-2xl font-bold text-emerald-600 capitalize mt-2">
            {userRole}
          </p>
        </div>

        
        <div className="bg-slate-50 p-6 rounded-xl border transition-all hover:shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified User</h3>
          <p className={`text-2xl font-bold mt-2 ${session.user?.emailVerified ? "text-blue-600" : "text-amber-600"}`}>
            {session.user?.emailVerified ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
}