const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const noteRoutes = require("./routes/note");

app.use(bodyParser.json());
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
