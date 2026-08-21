const express = require('express');
const router = express.Router()
const galleryController = require('../controllers/gallery.controller');
const authJwt = require('../middleware/auth.middleware');
const adminOnly = require('../middleware/admin.middleware');

router.post("/",authJwt, adminOnly,galleryController.createGallery)
router.get("/",galleryController.getGallery)
router.delete("/:id",authJwt, adminOnly,galleryController.deleteGallery)
router.put("/:id",authJwt, adminOnly,galleryController.updateGallery)


module.exports = router