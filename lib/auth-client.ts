// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  // যদি আপনার ব্যাকএন্ড আলাদা পোর্টে চলে (যেমন 5000), তাহলে এখানে সেট করুন
});