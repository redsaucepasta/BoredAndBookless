const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    author: String,
    thumbnailURL: String,
    status: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
