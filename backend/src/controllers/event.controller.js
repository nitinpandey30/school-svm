const mongoose = require("mongoose");
const eventModel = require("../models/event.model");
const cloudinary = require("../config/cloudinary");

// ================= CREATE EVENT =================

async function createEvent(req, res) {
  try {
    const {
      title,
      shortDescription,
      description,
      date,
      location,
      isActive,
      order,
    } = req.body;

    // Image required
    if (!req.file) {
      return res.status(400).json({
        message: "Event poster is required",
      });
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "school/events",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      stream.end(req.file.buffer);
    });

    const event = await eventModel.create({
      title,
      shortDescription,
      description,
      date,
      location,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0,
    });

    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.log("Create event error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

// ================= GET ACTIVE EVENTS =================

async function getActiveEvents(req, res) {
  try {
    const events = await eventModel
      .find({ isActive: true })
      .sort({ order: 1, date: 1, createdAt: -1 });

    return res.status(200).json({
      events,
    });
  } catch (error) {
    console.log("Get active events error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

// ================= GET ALL EVENTS =================

async function getAllEvents(req, res) {
  try {
    const events = await eventModel
      .find()
      .sort({ order: 1, date: 1, createdAt: -1 });

    return res.status(200).json({
      events,
    });
  } catch (error) {
    console.log("Get all events error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function getEventById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid event ID",
      });
    }

    const event = await eventModel.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json({
      event,
    });

  } catch (error) {
    console.log("Get event by id error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

// ================= UPDATE EVENT =================

async function updateEvent(req, res) {
  try {
    const { id } = req.params;

    const event = await eventModel.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const {
      title,
      shortDescription,
      description,
      date,
      location,
      isActive,
      order,
    } = req.body;

    // ================= NEW IMAGE =================

    if (req.file) {
      // Delete old image from Cloudinary
      if (event.publicId) {
        await cloudinary.uploader.destroy(event.publicId);
      }

      // Upload new image
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "school/events",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

        stream.end(req.file.buffer);
      });

      event.imageUrl = result.secure_url;
      event.publicId = result.public_id;
    }

    // ================= UPDATE FIELDS =================

    if (title !== undefined) {
      event.title = title;
    }

    if (shortDescription !== undefined) {
      event.shortDescription = shortDescription;
    }

    if (description !== undefined) {
      event.description = description;
    }

    if (date !== undefined) {
      event.date = date;
    }

    if (location !== undefined) {
      event.location = location;
    }

    if (isActive !== undefined) {
      event.isActive = isActive;
    }

    if (order !== undefined) {
      event.order = order;
    }

    await event.save();

    return res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.log("Update event error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

// ================= DELETE EVENT =================

async function deleteEvent(req, res) {
  try {
    const { id } = req.params;

    const event = await eventModel.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Delete image from Cloudinary
    if (event.publicId) {
      await cloudinary.uploader.destroy(event.publicId);
    }

    await eventModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.log("Delete event error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}

module.exports = {
  createEvent,
  getActiveEvents,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
