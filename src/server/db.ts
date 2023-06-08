import mongoose, { type Mongoose } from "mongoose";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
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
  if (cached.promise === null) {
    const opts = {
      bufferCommands: false,
      autoIndex: true,
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

// Create a single supabase client for interacting with your database

const globalForSupabase = globalThis as unknown as { supabase: SupabaseClient };

export const supabase =
  globalForSupabase.supabase ||
  createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

if (process.env.NODE_ENV !== "production")
  globalForSupabase.supabase = supabase;
