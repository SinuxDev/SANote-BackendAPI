const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const postRoutes = require("./routes/post");

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({}));

app.use(postRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
