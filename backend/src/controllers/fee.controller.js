const feeModel = require("../models/fee.model");
const cloudinary = require('../config/cloudinary');

async function createFee(req, res) {
  try {
    const { academicYear } = req.body;

    if (!academicYear) {
      return res.status(400).json({
        message: "Academic year is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Fee PDF is required",
      });
    }

    // Check duplicate academic year
    const existingFee = await feeModel.findOne({ academicYear });

    if (existingFee) {
      return res.status(400).json({
        message: "Fee structure for this academic year already exists",
      });
    }

    // Upload PDF to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "school-fees",
          resource_type: "raw",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    const fee = await feeModel.create({
      academicYear,
      pdfUrl: result.secure_url,
      publicId: result.public_id,
    });

    return res.status(201).json({
      message: "Fee structure uploaded successfully",
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
    const fees = await feeModel
      .find()
      .sort({ academicYear: -1 });

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
    const { academicYear } = req.body;

    const fee = await feeModel.findById(id);

    if (!fee) {
      return res.status(404).json({
        message: "Fee structure not found",
      });
    }

    // Update academic year if provided
    if (academicYear) {
      const existingFee = await feeModel.findOne({
        academicYear,
        _id: { $ne: id },
      });

      if (existingFee) {
        return res.status(400).json({
          message: "Fee structure for this academic year already exists",
        });
      }

      fee.academicYear = academicYear;
    }

    // If new PDF uploaded
    if (req.file) {

      // Delete old PDF
      if (fee.publicId) {
        await cloudinary.uploader.destroy(fee.publicId, {
          resource_type: "raw",
        });
      }

      // Upload new PDF
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "school-fees",
            resource_type: "raw",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.end(req.file.buffer);
      });

      fee.pdfUrl = result.secure_url;
      fee.publicId = result.public_id;
    }

    await fee.save();

    return res.status(200).json({
      message: "Fee structure updated successfully",
      fee,
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

    const fee = await feeModel.findById(id);

    if (!fee) {
      return res.status(404).json({
        message: "Fee structure not found",
      });
    }

    // Delete PDF from Cloudinary
    if (fee.publicId) {
      await cloudinary.uploader.destroy(fee.publicId, {
        resource_type: "raw",
      });
    }

    // Delete DB record
    await feeModel.findByIdAndDelete(id);

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