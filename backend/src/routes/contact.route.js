const express = require('express');
const router = express.Router()
const contactController = require('../controllers/contact.controller');
const authJwt = require("../middleware/auth.middleware");
const adminOnly = require('../middleware/admin.middleware');

router.post("/",contactController.createContact)
router.get("/",authJwt, adminOnly ,contactController.getContact)
router.delete("/:id",authJwt, adminOnly,contactController.deleteContacts)

module.exports = router