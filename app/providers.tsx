'use client';

import { AuthProvider } from '@/context/AuthContext'; // আপনার পাথ অনুযায়ী ঠিক করুন

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}