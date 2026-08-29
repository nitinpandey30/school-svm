const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema(
  {
    yearsOfExcellence: {
      type: String,
      required: true,
      trim: true,
    },

    students: {
      type: String,
      required: true,
      trim: true,
    },

    teachers: {
      type: String,
      required: true,
      trim: true,
    },

    achievements: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const statsModel = mongoose.model("stat", statsSchema);

module.exports = statsModel;