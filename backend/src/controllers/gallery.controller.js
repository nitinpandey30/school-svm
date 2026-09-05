const galleryModel = require("../models/gallery.model");
const cloudinary = require("../config/cloudinary");

async function createGallery(req, res) {
  try {
    const { title, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({
        error: "Title and date are required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: "At least one image is required",
      });
    }

    const images = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "school-gallery",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        uploadStream.end(file.buffer);
      });

      images.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    }

    const newGallery = new galleryModel({
      title,
      images,
      date,
    });

    await newGallery.save();

    return res.status(201).json({
      message: "Gallery Created Successfully",
      gallery: newGallery,
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function getGallery(req, res) {
  try {
    const gallery = await galleryModel.find();

    if (!gallery || gallery.length === 0) {
      return res.status(400).json({ error: "NO data found" });
    }

    return res.status(200).json({ message: "Success!", data: gallery });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function deleteGallery(req, res) {
  try {
    const { id } = req.params;

    const gallery = await galleryModel.findById(id);

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery not found",
      });
    }

    // Cloudinary se saari images delete
    for (const image of gallery.images) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await galleryModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Gallery deleted successfully",
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function updateGallery(req, res) {
  try {
    const { id } = req.params;
    const { title, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({
        error: "Title and date are required",
      });
    }

    const gallery = await galleryModel.findById(id);

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery not found",
      });
    }

    const images = [...gallery.images];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "school-gallery",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );

          uploadStream.end(file.buffer);
        });

        images.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    }

    gallery.title = title;
    gallery.date = date;
    gallery.images = images;

    await gallery.save();

    return res.status(200).json({
      message: "Gallery Updated Successfully!",
      gallery,
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function deleteGalleryImage(req, res) {
  try {
    const { id, imageId } = req.params;

    const gallery = await galleryModel.findById(id);

    if (!gallery) {
      return res.status(404).json({
        message: "Gallery not found",
      });
    }

    const image = gallery.images.id(imageId);

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    const result = await cloudinary.uploader.destroy(image.publicId);

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(500).json({
        error: "Failed to delete image from Cloudinary",
      });
    }

    gallery.images.pull(imageId);

    await gallery.save();

    return res.status(200).json({
      message: "Image deleted successfully",
      gallery,
    });
  } catch (error) {
    console.log("error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

module.exports = {
  createGallery,
  getGallery,
  deleteGallery,
  updateGallery,
  deleteGalleryImage,
};
