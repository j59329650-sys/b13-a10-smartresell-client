"use client";

import React, { useEffect, useState } from "react";
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
  X,
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

  // Login না থাকলে Login Page-এ পাঠাবে
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const userRole = (session.user as any)?.role || "buyer";

  const menuConfig: Record<string, MenuItem[]> = {
    buyer: [
      {
        name: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "My Orders",
        href: "/dashboard/my-orders",
        icon: ShoppingBag,
      },
      {
        name: "Wishlist",
        href: "/dashboard/wishlist",
        icon: Heart,
      },
      {
        name: "Profile",
        href: "/dashboard/profile",
        icon: User,
      },
    ],
    seller: [
      {
        name: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Add Product",
        href: "/dashboard/add-product",
        icon: PlusCircle,
      },
      {
        name: "My Products",
        href: "/dashboard/my-products",
        icon: Package,
      },
      {
        name: "Profile",
        href: "/dashboard/profile",
        icon: User,
      },
    ],
  };

  const menuItems = menuConfig[userRole] || menuConfig.buyer;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 h-screen w-72 bg-white border-r transition-transform duration-300
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b">
          <h1 className="text-2xl font-bold text-emerald-600">
            SmartResell
          </h1>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition"
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t p-4">

          <div className="flex items-center gap-3 mb-4">

            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="Profile"
                width={45}
                height={45}
                className="rounded-full"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h3 className="font-semibold">
                {session.user.name}
              </h3>

              <p className="text-sm text-gray-500 capitalize">
                {userRole}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1">

        {/* Mobile Header */}
        <header className="md:hidden bg-white h-16 border-b flex items-center justify-between px-4">

          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu />
          </button>

          <h2 className="font-bold text-emerald-600">
            Dashboard
          </h2>

          <div />
        </header>

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}