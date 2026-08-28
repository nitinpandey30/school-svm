const express = require("express");

const router = express.Router();

const heroController = require("../controllers/hero.controller");

const authJwt = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const upload = require("../middleware/upload");


// ================= PUBLIC =================

// Home page ke liye active heroes
router.get("/", heroController.getActiveHeroes);


// ================= ADMIN =================

// Saare heroes dekhne ke liye
router.get(
  "/all",
  authJwt,
  adminOnly,
  heroController.getAllHeroes
);


// Hero create + image upload
router.post(
  "/",
  authJwt,
  adminOnly,
  upload.single("image"),
  heroController.createHero
);


// Hero update + optional new image
router.put(
  "/:id",
  authJwt,
  adminOnly,
  upload.single("image"),
  heroController.updateHero
);


// Hero delete
router.delete(
  "/:id",
  authJwt,
  adminOnly,
  heroController.deleteHero
);


module.exports = router;