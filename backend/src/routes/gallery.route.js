const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/gallery.controller");
const authJwt = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");
const upload = require("../middleware/upload");

router.post(
  "/",
  authJwt,
  adminOnly,
  upload.array("images", 10),
  galleryController.createGallery,
);

router.get("/", galleryController.getGallery);

router.delete("/:id", authJwt, adminOnly, galleryController.deleteGallery);

router.put(
  "/:id",
  authJwt,
  adminOnly,
  upload.array("images", 10),
  galleryController.updateGallery,
);

router.delete(
  "/:id/image/:imageId",
  authJwt,
  adminOnly,
  galleryController.deleteGalleryImage,
);

module.exports = router;
