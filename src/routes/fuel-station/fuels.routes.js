const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  getAllFuels,
  updateFuelPrices,
} = require("../../controllers/fuel-station/fuels.controller");

const router = Router();

router.get("/getFuels", validateJWT, getAllFuels);
router.put("/updatePrices", updateFuelPrices);

module.exports = router;
