const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    src: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
