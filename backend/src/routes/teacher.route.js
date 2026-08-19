const express = require('express');
const router = express.Router()
const teacherController = require('../controllers/teacher.controller');
const authJwt = require('../middleware/auth.middleware');

router.post("/",authJwt,teacherController.createTeacher)
router.get("/",teacherController.getTeacher)
router.delete("/:id",authJwt,teacherController.deleteTeacher)
router.put("/:id",authJwt,teacherController.updateTeacher)


module.exports = router