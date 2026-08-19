const express = require('express');
const router = express.Router()
const eventController = require('../controllers/event.controller');
const authJwt = require('../middleware/auth.middleware');

router.post("/",authJwt,eventController.createEvent)
router.get("/",eventController.getEvents)
router.delete("/:id",authJwt,eventController.deleteEvents)
router.put("/:id",authJwt,eventController.updateEvent)


module.exports = router