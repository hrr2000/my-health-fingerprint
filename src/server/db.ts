import mongoose, { type Mongoose } from "mongoose";
import { env } from "@/env.mjs";

const globalForMongoose = globalThis as unknown as {
  mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
};

let cached = globalForMongoose.mongoose;

if (!cached) {
  cached = globalForMongoose.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(env.DATABASE_URL, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
