const express = require('express');
const router = express.Router()
const eventController = require('../controllers/event.controller');
const authJwt = require('../middleware/auth.middleware');
const adminOnly = require('../middleware/admin.middleware');

router.post("/",authJwt, adminOnly,eventController.createEvent)
router.get("/",eventController.getEvents)
router.delete("/:id",authJwt, adminOnly,eventController.deleteEvents)
router.put("/:id",authJwt, adminOnly,eventController.updateEvent)


module.exports = router