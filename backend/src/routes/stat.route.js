const express = require("express");

const {
  getStats,
  createStats,
  updateStats,
} = require("../controllers/stat.controller");

const authJwt = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getStats);


// ================= ADMIN =================

// Create stats
router.post("/", authJwt, createStats);

// Update stats
router.put("/", authJwt, updateStats);


module.exports = router;