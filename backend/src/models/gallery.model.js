const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },

        publicId: {
          type: String,
          required: true,
        },
      },
    ],

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const galleryModel = mongoose.model("gallery", gallerySchema);

module.exports = galleryModel;
