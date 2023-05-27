const BlogModel = require("../models/blog");

exports.create = async (req, res) => {
  try {
    const { title, description, blog_images, author, content, date } = req.body;

    // Check if Blog already exists in the database
    const existingBlog = await BlogModel.findOne({ title, description, blog_images, author, content, date });
    if (existingBlog) {
      return res.status(400).json({ success: false, message: "Blog already exists" });
    }

    // Validate request body fields
    if (!title || !description || !blog_images || !author || !content || !date) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const blog = new BlogModel({
      title,
      description,
      blog_images,
      author,
      content,
      date
    });
    await blog.save();
    res.status(200).json({ success: true, message: "Blog created successfully", data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create Blog", error: error.message });
  }
};


exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updates, options);

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update Blog',
      error: error.message,
    });
  }
};

// Get all Blogs
exports.list = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    // If there are no blogs in the database, return a 404 error
    if (!blogs.length) {
      return res.status(404).json({
        success: false,
        message: "No Blog Data found",
      });
    }

    // Return the list of blogs
    res.status(200).json({
      success: true,
      message: "Blog Data retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    // If there's an error while retrieving blogs, return a 500 error
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Blog",
      error: error.message,
    });
  }
};

// Get a Blog by ID
exports.read = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    // If the blog is not found, return a 404 error
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    // Return the blog
    res.status(200).json({
      success: true,
      message: "Blog retrieved successfully",
      data: blog,
    });
  } catch (error) {
    // If there's an error while retrieving the blog, return a 500 error
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Blog",
      error: error.message,
    });
  }
};

// Delete a Blog by ID
exports.delete = async (req, res) => {
  try {
    const Blog = await Blog.findByIdAndDelete(req.params.id);
    // If the Blog is not found, return a 404 error
    if (!Blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Return a success message
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    // If there's an error while deleting the Blog, return a 500 error
    res.status(500).json({
      success: false,
      message: "Failed to delete Blog",
      error: error.message,
    });
  }
};

// Delete all Blogs
exports.deleteAll = async (req, res) => {
  try {
    const result = await Blog.deleteMany({});
    // Return the number of Blogs deleted
    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} Blogs successfully`,
    });
  } catch (error) {
    // If there's an error while deleting the Blogs, return a 500 error
    res.status(500).json({
      success: false,
      message: "Failed to delete Blogs",
      error: error.message,
    });
  }
};
