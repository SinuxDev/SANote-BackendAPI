const { validationResult } = require("express-validator");

//models
const Note = require("../models/note");

//utils
const { unlink } = require("../utils/unlink");

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
  const cover_image = req.file;

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
    cover_image: cover_image ? cover_image.path : "",
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

exports.deleteNote = (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then((_) => {
      return res.status(204).json({ message: "Note Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Note Deletion Failed" });
    });
};

exports.getEditNote = (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      return res.status(200).json(note);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Note not found" });
    });
};

exports.updateNote = (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const cover_image = req.file;

  Note.findById(id)
    .then((note) => {
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      note.title = title;
      note.content = content;
      if (cover_image) {
        unlink(note.cover_image, (err) => {
          if (err) {
            console.log(err);
            return;
          }
          //file removed
        });
        note.cover_image = cover_image.path;
      }
      return note.save();
    })
    .then(() => {
      return res.status(200).json({ message: "Note Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Note Update Failed" });
    });
};
