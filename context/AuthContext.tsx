"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

interface AuthContextType {
  user: any;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();
  const [user, setUser] = useState<any>(null);

  const loginWithGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Google authentication process failed:", error);
    }
  };

  const logoutUser = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/login";
          },
        },
      });
    } catch (error) {
      console.error("Sign out processing failed:", error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
      
      const syncUser = async () => {
        try {
          // Pointing cleanly to your targeted backend server endpoint
          await fetch(`http://localhost:5000/users/${session.user.email}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }),
          });
        } catch (err) {
          // Gracefully handles server downtime without breaking the UI
          console.warn("External data store synchronization offline:", err);
        }
      };
      
      syncUser();
    } else {
      setUser(null);
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ user, loading: isPending, loginWithGoogle, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be called inside an explicit AuthProvider wrapper");
  }
  return context;
};