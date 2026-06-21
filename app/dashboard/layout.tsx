"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  LayoutDashboard,
  PlusCircle,
  Package,
  ShoppingBag,
  Heart,
  User,
  Settings,
  LogOut,
  Store,
  Users,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  // Better-Auth এর সেশন থেকে ইউজারের রোল বের করা (ডিফল্ট 'buyer' ধরা হয়েছে)
  const userRole = session?.user?.role || "buyer";

  // ১. সম্পূর্ণ রিকোয়ারমেন্ট অনুসারে রোলের ওপর ভিত্তি করে মেনু কনফিগারেশন
  const menuConfig: Record<string, Array<{ name: string; href: string; icon: any }>> = {
    buyer: [
      { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { name: "My Orders", href: "/dashboard/my-orders", icon: ShoppingBag },
      { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
      { name: "Profile Settings", href: "/dashboard/profile", icon: User },
    ],
    seller: [
      { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { name: "Add Product", href: "/dashboard/add-product", icon: PlusCircle },
      { name: "My Products", href: "/dashboard/my-products", icon: Package },
      { name: "Manage Orders", href: "/dashboard/manage-orders", icon: ShoppingBag },
      { name: "Profile Settings", href: "/dashboard/profile", icon: User },
    ],
    admin: [
      { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { name: "Manage Users", href: "/dashboard/manage-users", icon: Users },
      { name: "Manage Products", href: "/dashboard/manage-products", icon: Package },
      { name: "Manage Orders", href: "/dashboard/manage-orders", icon: ShoppingBag },
      { name: "Profile Settings", href: "/dashboard/profile", icon: User },
    ],
  };

  // বর্তমান লগইন করা ইউজারের রোলের মেনু সিলেক্ট করা
  const currentMenuItems = menuConfig[userRole] || menuConfig.buyer;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
       
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // ইউজার লগইন না থাকলে প্রটেকশন
  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100 p-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm text-center max-w-sm border">
          <p className="text-slate-600 font-medium mb-4">"Please log in first to access the dashboard."</p>
          <Link href="/login" className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 bg-white border-r flex-col">
        {/* Logo */}
        <div className="h-20 border-b flex items-center px-6">
          <Store className="w-8 h-8 text-emerald-600" />
          <h1 className="ml-3 text-2xl font-bold text-slate-800">SmartResell</h1>
        </div>

        {/* ডাইনামিক ফিল্টার্ড মেনু */}
        <div className="flex-1 p-4 overflow-y-auto">
          <nav className="space-y-2">
            {currentMenuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info (Sidebar Bottom) */}
        <div className="border-t p-4 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="Profile"
                width={45}
                height={45}
                className="rounded-full object-cover ring-2 ring-emerald-100"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            <div className="overflow-hidden">
              <h3 className="font-semibold text-slate-800 truncate">
                {session?.user?.name || "User"}
              </h3>
              {/* ডাইনামিক রোল লেবেল */}
              <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold capitalize">
                {userRole}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition font-medium text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b px-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
            <p className="text-sm text-slate-500">
              Welcome back, {session?.user?.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <h3 className="font-medium text-slate-800">{session?.user?.name}</h3>
              {/* হেডার রাইট সাইডেও ডাইনামিক রোল টেক্সট */}
              <p className="text-xs text-slate-500 font-semibold capitalize">
                {userRole} Account
              </p>
            </div>

            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full object-cover ring-2 ring-emerald-100"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}