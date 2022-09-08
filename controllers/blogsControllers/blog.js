const Blog = require("../../models/blogsModels/blog");
const mongoose = require("mongoose");
// get all workouts
const getBlogs = async (req, res) => {
  const workouts = await Blog.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// get single blog
const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Blog" });
  }

  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ error: "No Such Blog" });
  blog.views++;
  await blog.save();
  res.status(200).json(blog);
};

// create a blog
const addBlog = async (req, res) => {
  const { title, body, author } = req.body;

  if (!title || !body || !author) {
    return res.status(400).json({
      error: "Please fill in all the fields",
    });
  }
  try {
    const blog = await Blog.create({ title, body, author });
    res.status(200).json(blog);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// delete blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Blog" });
  }

  const blog = await Blog.findOneAndDelete({ _id: id });

  if (!blog) return res.status(404).json({ error: "No Such Blog" });
  res.status(200).json(blog);
};

// export the functions
module.exports = {
  getBlogs,
  getBlog,
  deleteBlog,
  addBlog,
};
