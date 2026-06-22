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
        type: "string",
        defaultValue: "buyer",
      },
      plan: {
        type: "string", 
        defaultValue: "free",
      },
    },
  },
  
  session: {
   
    expiresIn: 60 * 60 * 24 * 7, 
    updateAge: 60 * 60 * 24, 
  },
  
  plugins: [jwt()],
});