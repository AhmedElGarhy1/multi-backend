require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutRoutes/workouts");
const userRoutes = require("./routes/workoutRoutes/user");
const blogsRoutes = require("./routes/blogRoutes/blogs");

// express App
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blogs", blogsRoutes);
app.get("/", (req, res) => {
  res.send(
    `<h1 style="text-align: center;">Welcome to Ahmed Elgarhy Test Server</h1>`
  );
});

const PORT = process.env.PORT || 8000;
// connect to mongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log("Running On Port " + PORT));
  })
  .catch((err) => {
    console.log(err);
  });
