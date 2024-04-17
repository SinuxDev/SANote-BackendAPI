const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const noteController = require("../controllers/note");

const authMiddleware = require("../middleware/is-auth");

// GET: /notes
router.get("/notes", noteController.getNotes);

// POST: /create
router.post(
  "/create",
  authMiddleware,
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

// Delete /delete/:id
router.delete("/delete/:id", authMiddleware, noteController.deleteNote);

// Get Edit /edit/:id
router.get("/edit/:id", noteController.getEditNote);

// PUT /edit/:id
router.put(
  "/edit-note/:id",
  authMiddleware,
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
  noteController.updateNote
);

module.exports = router;
