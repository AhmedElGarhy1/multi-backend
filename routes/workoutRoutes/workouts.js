const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/authMiddleware");

const {
  getWorkouts,
  getWorkout,
  postWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../../controllers/workoutControllers/workout");

router.use(authMiddleware);
// Get All workouts
router.get("/", getWorkouts);

// post a new workout
router.post("/", postWorkout);

// get a single workout
router.get("/:id", getWorkout);
// update a workout
router.patch("/:id", updateWorkout);
// Delete a workout
router.delete("/:id", deleteWorkout);

module.exports = router;
