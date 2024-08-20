const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createSalesControl,
  updateSalesControl,
  getLastSalesControl,
} = require("../../controllers/sales/sales.controller");

const router = Router();

router.post("/newSalesControl", validateJWT, createSalesControl);
router.put("/updateSalesControl", validateJWT, updateSalesControl);
router.get("/lastSalesControl", validateJWT, getLastSalesControl);

module.exports = router;
