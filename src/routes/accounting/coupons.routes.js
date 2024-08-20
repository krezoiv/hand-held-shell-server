const express = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  getCouponsSalesControl,
} = require("../../controllers/accounting/coupons.controller");
const router = express.Router();

router.post("/createCoupons", validateJWT, createCoupon);
router.get("/getAllCoupons", validateJWT, getAllCoupons);
router.get("/getCouponsSalesControl", validateJWT, getCouponsSalesControl);
router.get("/getCouponById/:couponId", validateJWT, getCouponById);
router.put("/updadateCoupon/:couponId", validateJWT, updateCoupon);
router.delete("/deleteCoupons/:couponId", validateJWT, deleteCoupon);

module.exports = router;
