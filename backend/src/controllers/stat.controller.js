const statsModel = require("../models/stat.model");

// ================= GET PUBLIC STATS =================

async function getStats(req, res) {
  try {
    const stats = await statsModel.findOne();

    if (!stats) {
      return res.status(404).json({
        message: "Stats not found",
      });
    }

    return res.status(200).json({
      stats,
    });

  } catch (error) {
    console.log("Get stats error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}


// ================= CREATE STATS =================

async function createStats(req, res) {
  try {
    const {
      yearsOfExcellence,
      students,
      teachers,
      achievements,
    } = req.body;

    if (
      yearsOfExcellence === undefined ||
      students === undefined ||
      teachers === undefined ||
      achievements === undefined
    ) {
      return res.status(400).json({
        message: "All stats fields are required",
      });
    }

    const existingStats = await statsModel.findOne();

    if (existingStats) {
      return res.status(400).json({
        message: "Stats already exist. Update them instead.",
      });
    }

    const stats = await statsModel.create({
      yearsOfExcellence,
      students,
      teachers,
      achievements,
    });

    return res.status(201).json({
      message: "Stats created successfully",
      stats,
    });

  } catch (error) {
    console.log("Create stats error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}


// ================= UPDATE STATS =================

async function updateStats(req, res) {
  try {
    const {
      yearsOfExcellence,
      students,
      teachers,
      achievements,
    } = req.body;

    const stats = await statsModel.findOne();

    if (!stats) {
      return res.status(404).json({
        message: "Stats not found",
      });
    }

    stats.yearsOfExcellence =
      yearsOfExcellence ?? stats.yearsOfExcellence;

    stats.students =
      students ?? stats.students;

    stats.teachers =
      teachers ?? stats.teachers;

    stats.achievements =
      achievements ?? stats.achievements;

    await stats.save();

    return res.status(200).json({
      message: "Stats updated successfully",
      stats,
    });

  } catch (error) {
    console.log("Update stats error:", error);

    return res.status(500).json({
      error: "Server Error",
    });
  }
}


module.exports = {
  getStats,
  createStats,
  updateStats,
};