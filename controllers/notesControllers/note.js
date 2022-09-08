const Note = require("../../models/notesModels/note");
const mongoose = require("mongoose");
// get all notes
const getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

// create a Note
const addNote = async (req, res) => {
  const { title, details, category, username } = req.body;

  if (!title || !details || !category || !username) {
    return res.status(400).json({
      error: "Please fill in all the fields",
    });
  }
  try {
    const note = await Note.create({
      title,
      details,
      category,
      username,
      userId: req.userId,
    });
    res.status(200).json(note);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// delete Note
const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Note" });
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) return res.status(404).json({ error: "No Such Note" });
  res.status(200).json(note);
};

// export the functions
module.exports = {
  getNotes,
  deleteNote,
  addNote,
};
