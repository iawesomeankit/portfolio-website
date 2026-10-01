import { Router } from "express";
import { seedBlogs } from "../data/blogs.js";
import { BlogModel } from "../models/Blog.js";
import mongoose from "mongoose";

const router = Router();
const dbReady = () => mongoose.connection.readyState === 1;

router.get("/", async (_req, res) => {
  try {
    if (dbReady()) {
      const docs = await BlogModel.find().lean();
      if (docs.length) return res.json(docs);
    }
    res.json(seedBlogs);
  } catch {
    res.json(seedBlogs);
  }
});

router.get("/:slug", async (req, res) => {
  try {
    if (dbReady()) {
      const doc = await BlogModel.findOne({ slug: req.params.slug }).lean();
      if (doc) return res.json(doc);
    }
    const found = seedBlogs.find((b) => b.slug === req.params.slug);
    if (!found) return res.status(404).json({ message: "Not found" });
    res.json(found);
  } catch {
    const found = seedBlogs.find((b) => b.slug === req.params.slug);
    if (!found) return res.status(404).json({ message: "Not found" });
    res.json(found);
  }
});

export default router;
