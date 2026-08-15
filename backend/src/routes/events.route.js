const express = require('express');
const router = express.Router()
const eventController = require('../controllers/event.controller');

router.post("/",eventController.createEvent)
router.get("/",eventController.getEvents)
router.delete("/:id",eventController.deleteEvents)
router.put("/:id",eventController.updateEvent)


module.exports = router