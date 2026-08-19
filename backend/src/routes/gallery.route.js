const express = require('express');
const router = express.Router()
const galleryController = require('../controllers/gallery.controller');
const authJwt = require('../middleware/auth.middleware');

router.post("/",authJwt,galleryController.createGallery)
router.get("/",galleryController.getGallery)
router.delete("/:id",authJwt,galleryController.deleteGallery)
router.put("/:id",authJwt,galleryController.updateGallery)


module.exports = router