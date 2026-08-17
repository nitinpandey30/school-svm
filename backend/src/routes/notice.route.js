const express = require('express');
const router = express.Router()
const noticeController = require('../controllers/notice.controller');

router.post("/",noticeController.createNotice)
router.get("/",noticeController.getNotice)
router.delete("/:id",noticeController.deleteNotice)
router.put("/:id",noticeController.updateNotice)



module.exports = router