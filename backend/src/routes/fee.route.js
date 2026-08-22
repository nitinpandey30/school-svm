const express = require("express");
const router = express.Router();

const feeController = require("../controllers/fee.controller");
const authJwt = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

router.get("/", feeController.getFees);

router.post("/", authJwt, adminOnly, feeController.createFee);

router.put("/:id", authJwt, adminOnly, feeController.updateFee);

router.delete("/:id", authJwt, adminOnly, feeController.deleteFee);

module.exports = router;