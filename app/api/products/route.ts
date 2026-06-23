import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

export async function GET() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const products = await db
      .collection("products")
      .find({})
      .sort({ _id: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}