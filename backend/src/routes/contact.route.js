const express = require('express');
const router = express.Router()
const contactController = require('../controllers/contact.controller');

router.post("/",contactController.createContact)
router.get("/",contactController.getContact)
router.delete("/:id",contactController.deleteContacts)

module.exports = router