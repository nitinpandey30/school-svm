const express = require('express');
const router = express.Router()
const contactController = require('../controllers/contact.controller');
const authJwt = require("../middleware/auth.middleware")

router.post("/",authJwt ,contactController.createContact)
router.get("/",contactController.getContact)
router.delete("/:id",authJwt,contactController.deleteContacts)

module.exports = router