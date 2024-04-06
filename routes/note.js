const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const noteController = require("../controllers/note");

// GET: /notes

router.get("/notes", noteController.getNotes);

// POST: /create

router.post(
  "/create",
  [
    body("title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Title should be at least 3 characters")
      .isLength({ max: 30 })
      .withMessage("Title is too long!"),
    body("content")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Content too short!"),
  ],
  noteController.createNote
);

// GET: /notes/:id
router.get("/notes/:id", noteController.getNoteDetails);

module.exports = router;
