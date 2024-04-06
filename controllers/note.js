const { validationResult } = require("express-validator");

//models
const Note = require("../models/note");

exports.getNotes = (req, res, next) => {
  Note.find()
    .sort({ createdAt: -1 })
    .then((notes) => {
      return res.status(200).json(notes);
    })
    .catch((err) => {
      res.status(404).json({ message: "Notes Not Found" });
      console.log(err);
    });
};

exports.createNote = (req, res, next) => {
  const { title, content } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid Inputs && Validation Failed",
      errorMessages: errors.array(),
    });
  }

  Note.create({
    title,
    content,
  })
    .then((_) => {
      return res.status(201).json({ message: "Note Created" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Note Creation Failed" });
    });
};

exports.getNoteDetails = (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      return res.status(200).json(note);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Note Not Found" });
    });
};
