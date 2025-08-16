import mongoose from "mongoose";
import { cache } from "react";
import { Snippet } from "@/interface/interfaces";
import { SnippetModel } from "@/models/Snippet";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose;
if (!cached) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  cached.promise =
    cached.promise || mongoose.connect(MONGODB_URI, { bufferCommands: false });
  cached.conn = await cached.promise;
  return cached.conn;
}

export const getSnippet = cache(async (slug: string) => {
  await connectDB();
  const snippet = await SnippetModel.findOne({ slug }).lean<Snippet>();
  return snippet;
});

export const getSnippets = cache(async () => {
  await connectDB();
  const snippets: Snippet[] = await SnippetModel.find().lean<Snippet[]>();
  return snippets;
});
