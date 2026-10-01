import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { seedBlogs } from "./data/blogs.js";
import { BlogModel } from "./models/Blog.js";
import blogRoutes from "./routes/blogs.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    db: mongoose.connection.readyState === 1 ? "mongo" : "memory",
    time: new Date().toISOString(),
  });
});

app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);

async function seedIfEmpty() {
  try {
    const count = await BlogModel.countDocuments();
    if (count === 0) {
      await BlogModel.insertMany(seedBlogs);
      console.log(`Seeded ${seedBlogs.length} blogs`);
    }
  } catch (e) {
    console.log("Seed skipped (no DB):", (e as Error).message);
  }
}

async function start() {
  const uri = process.env.MONGO_URI;
  if (uri) {
    try {
      await mongoose.connect(uri);
      console.log("MongoDB connected");
      await seedIfEmpty();
    } catch (e) {
      console.log("Mongo connection failed, using in-memory blogs:", (e as Error).message);
    }
  } else {
    console.log("No MONGO_URI — serving blogs from memory");
  }
  app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
}

start();
