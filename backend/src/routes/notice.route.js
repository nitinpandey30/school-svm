const express = require('express');
const router = express.Router()
const noticeController = require('../controllers/notice.controller');
const authJwt = require('../middleware/auth.middleware');

router.post("/",authJwt,noticeController.createNotice)
router.get("/",noticeController.getNotice)
router.delete("/:id",authJwt,noticeController.deleteNotice)
router.put("/:id",authJwt,noticeController.updateNotice)



module.exports = router