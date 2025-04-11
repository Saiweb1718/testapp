import mongoose from "mongoose";

type MongooseConnection = {
  isConnected?: number;
};

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI not found in environment variables.");
}

const connection: MongooseConnection = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("✅ MongoDB already connected.");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    connection.isConnected = mongoose.connection.readyState;
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    // Optional: throw instead of exit to help debugging in dev
    throw new Error("Failed to connect to MongoDB");
  }
}

export default dbConnect;
