import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    tags: { type: [String], default: [] },
    content: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const BlogModel = mongoose.models.Blog ?? mongoose.model("Blog", BlogSchema);
