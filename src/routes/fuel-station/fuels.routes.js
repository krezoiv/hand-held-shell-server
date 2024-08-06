const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  getAllFuels,
} = require("../../controllers/fuel-station/fuels.controller");

const router = Router();

router.get("/getFuels", validateJWT, getAllFuels);

module.exports = router;
