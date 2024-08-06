const express = require("express");
const router = express.Router();
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
} = require("../../controllers/accounting/vouches.controller");

router.post("/createVouchers", validateJWT, createVoucher);
router.get("/getAllVouchers", validateJWT, getAllVouchers);
router.get("/getVoucherById/:voucherId", validateJWT, getVoucherById);
router.put("/updateVoucher/:voucherId", validateJWT, updateVoucher);
router.delete("/deleteVoucher/:voucherId", validateJWT, deleteVoucher);

module.exports = router;
