import mongoose from "mongoose";

// Global caching pattern for Next.js hot-reloading
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  const mongodbUri = process.env.MONGODB_URI;

  if (cached.conn) {
    return { conn: cached.conn, isMock: false };
  }

  if (!mongodbUri) {
    console.log("[DB Info] No MONGODB_URI found in process.env. Using local fallback JSON storage.");
    return { conn: null, isMock: true };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(mongodbUri, opts)
      .then((mongooseInstance) => {
        console.log("[DB Success] Successfully connected to MongoDB Atlas Cloud Database");
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn("[DB Warning] MongoDB Atlas connection failed/timed out. Switching gracefully to local fallback storage:", err.message);
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
