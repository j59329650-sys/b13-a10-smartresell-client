import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// টাইপ সেফটির জন্য 'as string' যোগ করা হলো
const client = new MongoClient(mongoUri as string);
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
    expiresIn: 60 * 60 * 24 * 7, // ১ সপ্তাহ
    updateAge: 60 * 60 * 24, // ১ দিন
  },
  
  plugins: [jwt()],
});