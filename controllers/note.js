const { validationResult } = require("express-validator");

//models
const Note = require("../models/note");

exports.getNotes = (req, res, next) => {};

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
