const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    // Event Poster
    imageUrl: {
      type: String,
      required: true,
    },

    // Cloudinary public ID
    publicId: {
      type: String,
      required: true,
    },

    // Show / hide event
    isActive: {
      type: Boolean,
      default: true,
    },

    // Control event order
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;