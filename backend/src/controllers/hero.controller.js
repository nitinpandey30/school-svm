const heroModel = require("../models/hero.model");
const cloudinary = require("../config/cloudinary");


// ================= CREATE HERO =================

async function createHero(req, res) {
  try {
    const {
      title,
      subtitle,
      buttonText,
      buttonLink,
      isActive,
      order,
    } = req.body;

    // Image required
    if (!req.file) {
      return res.status(400).json({
        message: "Hero image is required",
      });
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "school/hero",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(req.file.buffer);
    });

    const hero = await heroModel.create({
      title,
      subtitle,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      buttonText,
      buttonLink,
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0,
    });

    return res.status(201).json({
      message: "Hero created successfully",
      hero,
    });

  } catch (error) {
    console.log("Create hero error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}


// ================= GET ACTIVE HEROES =================

async function getActiveHeroes(req, res) {
  try {
    const heroes = await heroModel
      .find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });

    return res.status(200).json({
      heroes,
    });

  } catch (error) {
    console.log("Get active heroes error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}


// ================= GET ALL HEROES =================

async function getAllHeroes(req, res) {
  try {
    const heroes = await heroModel
      .find()
      .sort({ order: 1, createdAt: -1 });

    return res.status(200).json({
      heroes,
    });

  } catch (error) {
    console.log("Get all heroes error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}


// ================= UPDATE HERO =================

async function updateHero(req, res) {
  try {
    const { id } = req.params;

    const hero = await heroModel.findById(id);

    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
      });
    }

    const {
      title,
      subtitle,
      buttonText,
      buttonLink,
      isActive,
      order,
    } = req.body;


    // If new image uploaded
    if (req.file) {

      // Delete old image from Cloudinary
      if (hero.publicId) {
        await cloudinary.uploader.destroy(hero.publicId);
      }

      // Upload new image
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "school/hero",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      hero.imageUrl = result.secure_url;
      hero.publicId = result.public_id;
    }


    // Update fields only if provided

    if (title !== undefined) {
      hero.title = title;
    }

    if (subtitle !== undefined) {
      hero.subtitle = subtitle;
    }

    if (buttonText !== undefined) {
      hero.buttonText = buttonText;
    }

    if (buttonLink !== undefined) {
      hero.buttonLink = buttonLink;
    }

    if (isActive !== undefined) {
      hero.isActive = isActive;
    }

    if (order !== undefined) {
      hero.order = order;
    }


    await hero.save();

    return res.status(200).json({
      message: "Hero updated successfully",
      hero,
    });

  } catch (error) {
    console.log("Update hero error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}


// ================= DELETE HERO =================

async function deleteHero(req, res) {
  try {
    const { id } = req.params;

    const hero = await heroModel.findById(id);

    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
      });
    }


    // Delete image from Cloudinary

    if (hero.publicId) {
      await cloudinary.uploader.destroy(hero.publicId);
    }


    await heroModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Hero deleted successfully",
    });

  } catch (error) {
    console.log("Delete hero error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}


module.exports = {
  createHero,
  getActiveHeroes,
  getAllHeroes,
  updateHero,
  deleteHero,
};