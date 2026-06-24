"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Package, 
  ShoppingBag, 
  Heart, 
  User, 
  LogOut, 
  Menu,
  X 
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  
  const userRole = (session?.user as any)?.role || "buyer";

  const menuConfig: Record<string, MenuItem[]> = {
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
      { name: "Profile Settings", href: "/dashboard/profile", icon: User },
    ],
  };

  const menuItems = menuConfig[userRole] || menuConfig.buyer;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      
      {/* মোবাইল টপ বার */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center border-b border-gray-200">
        <span className="text-xl font-bold text-emerald-600">SmartResell</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* মোবাইল ব্যাকড্রপ */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* সাইডবার */}
      <aside className={`fixed md:static top-0 bottom-0 left-0 w-72 bg-white z-50 flex flex-col border-r border-gray-200 transform transition-transform duration-300 md:translate-x-0 ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <span className="text-2xl font-bold text-emerald-600">SmartResell</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 font-medium transition-all"
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-4">
          {session?.user && (
            <div className="flex items-center gap-3 px-2">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover ring-2 ring-emerald-100"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <div className="truncate">
                <p className="text-sm font-semibold text-gray-800 truncate">{session.user.name}</p>
                <p className="text-xs text-gray-400 capitalize">{userRole} Account</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* মেইন কনটেন্ট */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>

    </div>
  );
}