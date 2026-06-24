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

 
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "");
  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const loginWithGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
       
        callbackURL: `${appUrl}/dashboard`, 
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
          
          await fetch(`${backendUrl}/users/${session.user.email}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }),
          });
        } catch (err) {
          console.warn("External data store synchronization offline:", err);
        }
      };
      
      syncUser();
    } else {
      setUser(null);
    }
  }, [session, backendUrl]);

  return (
    <div className="text-gray-800">
      <AuthContext.Provider value={{ user, loading: isPending, loginWithGoogle, logoutUser }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be called inside an explicit AuthProvider wrapper");
  }
  return context;
};