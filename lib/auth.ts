import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

// ১. ভেরিয়েবল না পাওয়া গেলে রানটাইম ক্র্যাশ এড়াতে একটি ফলব্যাক (Fallback) অথবা কন্ডিশন দেওয়া হলো
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const client = new MongoClient(mongoUri);
const db = client.db("smartresell");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  
  // সামাজিক বা সোশ্যাল লগইন (যেমন: গুগল) চালু করার জন্য প্রোভাইডার কনফিগ যোগ করা হলো
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  emailAndPassword: {
    enabled: true,
  },
  
  user: {
    additionalFields: {
      role: {
        type: "string", // ২. ফিল্ডের ডাটা টাইপ স্পষ্টভাবে উল্লেখ করে দিতে হবে
        defaultValue: "buyer",
      },
      plan: {
        type: "string", // ফিল্ডের ডাটা টাইপ স্পষ্টভাবে উল্লেখ করে দিতে হবে
        defaultValue: "free",
      },
    },
  },
  
  session: {
    // ৩. cookieCache অবজেক্টের সরাসরি কনফিগারের বদলে Better-Auth এর স্ট্যান্ডার্ড সেশন কনফিগ
    expiresIn: 60 * 60 * 24 * 7, // সেশনের মেয়াদ ৭ দিন (সেকেন্ড হিসেবে)
    updateAge: 60 * 60 * 24, // প্রতিদিন সেশন আপডেট হবে
  },
  
  plugins: [jwt()],
});