const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  blog_images: [String],
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
}, { timestamps: true, versionKey: false });

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;
