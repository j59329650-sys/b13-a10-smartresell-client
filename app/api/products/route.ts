import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

export async function GET() {
  const client = new MongoClient(uri);

  try {
    // MongoDB Connect
    await client.connect();

    // Database Name
    const db = client.db(process.env.MONGODB_DB);

    // Products Collection
    const productsCollection = db.collection("products");

    // Get All Products
    const products = await productsCollection
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("MongoDB Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  } finally {
    await client.close();
  }
}