"use client"; 
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({

  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://b13-a10-smartresell-server.vercel.app",
});

export const { signIn, signUp, useSession, signOut } = authClient;