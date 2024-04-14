const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.register = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid Inputs && Validation Failed",
      errorMessages: errors.array(),
    });
  }

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return User.create({
        username,
        email,
        password: hashedPassword,
      });
    })
    .then((result) => {
      return res
        .status(201)
        .json({ message: "User Created", userId: result._id });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "User Creation Failed" });
    });
};
