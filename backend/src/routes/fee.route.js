const express = require("express");
const router = express.Router();

const feeController = require("../controllers/fee.controller");
const authJwt = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");
const uploadPdf = require("../middleware/uploadPdf");
// Public
router.get("/", feeController.getFees);

// Admin
router.post(
  "/",
  authJwt,
  adminOnly,
  uploadPdf.single("pdf"),
  feeController.createFee,
);

router.put(
  "/:id",
  authJwt,
  adminOnly,
  uploadPdf.single("pdf"),
  feeController.updateFee,
);

router.delete("/:id", authJwt, adminOnly, feeController.deleteFee);

module.exports = router;
