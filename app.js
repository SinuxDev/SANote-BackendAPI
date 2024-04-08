const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();

const noteRoutes = require("./routes/note");

const stroageConfigure = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "-" + file.originalname);
  },
});

const fileFilterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};

app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));
app.use(bodyParser.json());
app.use(
  multer({ storage: stroageConfigure, fileFilter: fileFilterConfigure }).single(
    "cover_image"
  )
);
app.use(cors({}));

app.use(noteRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then((_) => {
    app.listen(8000);
    console.log("Database Connected & Server is running on port 8000");
  })
  .catch((err) => {
    console.log(err);
  });
