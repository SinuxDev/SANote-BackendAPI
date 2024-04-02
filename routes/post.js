const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");

// GET /posts
router.get("/posts", postController.getPost);

module.exports = router;
