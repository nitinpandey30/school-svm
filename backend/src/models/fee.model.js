const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    admissionFee: {
      type: Number,
      required: true,
      min: 0,
    },

    tuitionFee: {
      type: Number,
      required: true,
      min: 0,
    },

    annualFee: {
      type: Number,
      required: true,
      min: 0,
    },

    examFee: {
      type: Number,
      required: true,
      min: 0,
    },

    otherCharges: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const feeModel = mongoose.model("Fee", feeSchema);

module.exports = feeModel;