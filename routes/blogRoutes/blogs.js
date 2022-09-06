const express = require("express");
const router = express.Router();

const {
  getBlogs,
  getBlog,
  deleteBlog,
  addBlog,
} = require("../../controllers/blogsControllers/blog");

// Get All workouts
router.get("/", getBlogs);

// post a new workout
router.post("/", addBlog);

// get a single workout
router.get("/:id", getBlog);
// Delete a workout
router.delete("/:id", deleteBlog);

module.exports = router;
