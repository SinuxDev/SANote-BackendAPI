const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  notes: {
    type: Schema.Types.ObjectId,
    ref: "notes",
  },
});

const User = model("users", userSchema);
module.exports = User;
