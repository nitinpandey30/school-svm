const express = require('express');
const router = express.Router()
const teacherController = require('../controllers/teacher.controller');
const authJwt = require('../middleware/auth.middleware');
const adminOnly = require('../middleware/admin.middleware');

router.post("/",authJwt, adminOnly,teacherController.createTeacher)
router.get("/",teacherController.getTeacher)
router.delete("/:id",authJwt, adminOnly,teacherController.deleteTeacher)
router.put("/:id",authJwt, adminOnly,teacherController.updateTeacher)


module.exports = router