const express = require("express");
const bodyParser = require("body-parser");

const postRoutes = require("./routes/post");

const app = express();

app.use(postRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
