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

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Account Login Failed",
      errorMessages: errors.array(),
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            return res.status(200).json({ message: "Login Success" });
          }

          return res
            .status(401)
            .json({ message: "email or passsword is not valid" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ message: "Faild!" });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: err.message });
    });
};
