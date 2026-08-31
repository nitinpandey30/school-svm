const express = require('express');
const router = express.Router()
const eventController = require('../controllers/event.controller');
const authJwt = require('../middleware/auth.middleware');
const adminOnly = require('../middleware/admin.middleware');
const upload = require('../middleware/upload');

router.get("/",eventController.getActiveEvents)
router.get("/all",authJwt,adminOnly, eventController.getAllEvents)
router.post("/",authJwt, adminOnly,upload.single("image") ,eventController.createEvent)
router.put("/:id",authJwt, adminOnly,upload.single("image") ,eventController.updateEvent)
router.delete("/:id",authJwt, adminOnly,eventController.deleteEvent)


module.exports = router