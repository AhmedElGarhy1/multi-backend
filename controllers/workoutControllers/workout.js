const Workout = require("../../models/workoutsModels/workout");
const mongoose = require("mongoose");
// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  const workout = await Workout.findById(id);
  if (!workout) return res.status(404).json({ error: "No Such Workout" });
  res.status(200).json(workout);
};

// create a workout
const postWorkout = async (req, res) => {
  const { title, reps, loads } = req.body;

  let emptyData = [];
  if (!title) {
    emptyData.push("title");
  }
  if (!reps) {
    emptyData.push("reps");
  }
  if (!loads) {
    emptyData.push("loads");
  }
  if (emptyData.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the fields",
      emptyFields: emptyData,
    });
  }
  try {
    const workout = await Workout.create({ title, reps, loads });
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const newWorkout = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, newWorkout);

  if (!workout) return res.status(404).json({ error: "No Such Workout" });
  res.status(200).json(workout);
};

// delete workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) return res.status(404).json({ error: "No Such Workout" });
  res.status(200).json(workout);
};

// export the functions
module.exports = {
  getWorkouts,
  getWorkout,
  postWorkout,
  updateWorkout,
  deleteWorkout,
};
