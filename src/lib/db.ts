import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Global caching pattern for Next.js hot-reloading
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return { conn: cached.conn, isMock: false };
  }

  // Fallback to local MongoDB if URI is not provided
  const uri = MONGODB_URI || "mongodb://127.0.0.1:27017/ndhanani_portfolio";

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000, // Timeout fast so we can fallback gracefully
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongooseInstance) => {
        console.log("Successfully connected to MongoDB");
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn("MongoDB connection failed, using fallback storage:", err.message);
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return { conn: cached.conn, isMock: false };
  } catch (e) {
    cached.promise = null;
    return { conn: null, isMock: true };
  }
}

export default dbConnect;
