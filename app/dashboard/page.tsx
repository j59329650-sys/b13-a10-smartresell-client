"use client";

import React, { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  // 🔒 সিকিউরিটি চেক: ইউজার লগইন না থাকলে তাকে লগইন পেজে পাঠিয়ে দেবে
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // ⏳ ডেটা লোড হওয়ার সময় একটি সুন্দর লোডার দেখাবে (ফ্লিকারিং এড়াতে)
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // 🛡️ যদি কোনো কারণে সেশন না থাকে, তাহলে নিচের অংশটি রেন্ডার হবে না
  if (!session) return null;

  // TypeScript এর লাল দাগ দূর করতে 'role' কে টাইপ কাস্টিং করে নেওয়া হলো
  const userRole = (session.user as any).role || "Buyer";

  return (
    <div className="bg-white p-8 rounded-2xl border shadow-sm max-w-4xl">
      <h1 className="text-3xl font-extrabold text-slate-800">
        Welcome to your Dashboard Overview, {session?.user?.name || "User"}! 🎉
      </h1>
      <p className="text-slate-500 mt-2 text-base">
        "You can now manage your account statistics, sales, and order information right from here."
      </p>

      {/* কার্ড গ্রিড সেকশন */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <div className="bg-slate-50 p-6 rounded-xl border">
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Total Activity</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">Active</p>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border">
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Account Role</h3>
          <p className="text-2xl font-bold text-emerald-600 capitalize mt-1">
            {userRole}
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border">
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Verified User</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {session?.user?.emailVerified ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
}