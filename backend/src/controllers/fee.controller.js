const feeModel = require("../models/fee.model");

async function createFee(req, res) {
  try {
    const {
      className,
      admissionFee,
      tuitionFee,
      annualFee,
      examFee,
      otherCharges,
    } = req.body;

    if (
      !className ||
      admissionFee === undefined ||
      tuitionFee === undefined ||
      annualFee === undefined ||
      examFee === undefined
    ) {
      return res.status(400).json({
        message: "All required fields are required",
      });
    }

    const existingFee = await feeModel.findOne({ className });

    if (existingFee) {
      return res.status(400).json({
        message: "Fee structure for this class already exists",
      });
    }

    const fee = await feeModel.create({
      className,
      admissionFee,
      tuitionFee,
      annualFee,
      examFee,
      otherCharges,
    });

    return res.status(201).json({
      message: "Fee structure created successfully",
      fee,
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function getFees(req, res) {
  try {
    const fees = await feeModel.find().sort({ className: 1 });

    return res.status(200).json({
      fees,
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function updateFee(req, res) {
  try {
    const { id } = req.params;

    const updatedFee = await feeModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedFee) {
      return res.status(404).json({
        message: "Fee structure not found",
      });
    }

    return res.status(200).json({
      message: "Fee structure updated successfully",
      fee: updatedFee,
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function deleteFee(req, res) {
  try {
    const { id } = req.params;

    const deletedFee = await feeModel.findByIdAndDelete(id);

    if (!deletedFee) {
      return res.status(404).json({
        message: "Fee structure not found",
      });
    }

    return res.status(200).json({
      message: "Fee structure deleted successfully",
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

module.exports = {
  createFee,
  getFees,
  updateFee,
  deleteFee,
};