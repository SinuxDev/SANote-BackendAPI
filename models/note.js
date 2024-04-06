const { model, Schema } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    content: {
      type: String,
      required: true,
      minlength: 5,
    },
    creater: {
      type: String,
      default: "Anonymous",
    },
  },
  { timestamps: true }
);

const Note = model("Note", noteSchema);
module.exports = Note;
