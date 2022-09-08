const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/authMiddleware");

const {
  getNotes,
  deleteNote,
  addNote,
} = require("../../controllers/notesControllers/note");

router.use(authMiddleware);
// Get All workouts
router.get("/", getNotes);

// post a new workout
router.post("/", addNote);

// Delete a workout
router.delete("/:id", deleteNote);

module.exports = router;
