const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    subtitle: {
      type: String,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    buttonText: {
      type: String,
      trim: true,
    },

    buttonLink: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const heroModel = mongoose.model("hero", heroSchema);

module.exports = heroModel;