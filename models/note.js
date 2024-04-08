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
    author: {
      type: String,
      default: "Anonymous",
    },
    cover_image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Note = model("Note", noteSchema);
module.exports = Note;
