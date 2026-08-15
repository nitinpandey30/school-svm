const express = require('express');
const router = express.Router()
const galleryController = require('../controllers/gallery.controller');

router.post("/",galleryController.createGallery)
router.get("/",galleryController.getGallery)
router.delete("/:id",galleryController.deleteGallery)
router.put("/:id",galleryController.updateGallery)


module.exports = router