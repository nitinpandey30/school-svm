const express = require('express');
const router = express.Router()
const noticeController = require('../controllers/notice.controller');
const authJwt = require('../middleware/auth.middleware');
const adminOnly = require('../middleware/admin.middleware');

router.post("/",authJwt, adminOnly ,noticeController.createNotice)
router.get("/",noticeController.getNotice)
router.delete("/:id",authJwt, adminOnly,noticeController.deleteNotice)
router.put("/:id",authJwt, adminOnly,noticeController.updateNotice)



module.exports = router