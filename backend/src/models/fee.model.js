const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    academicYear: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const feeModel = mongoose.model("Fee", feeSchema);

module.exports = feeModel;