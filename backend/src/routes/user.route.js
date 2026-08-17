const express = require('express');
const router = express.Router()
const userController = require('../controllers/user.controller');

router.post("/signup",userController.createUser)
// router.get("/",userController.getUser)
// router.delete("/:id",userController.deleteUser)
// router.put("/:id",userController.updateUser)

module.exports  = router
