const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  if (!decodedToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};

module.exports = isAuth;
