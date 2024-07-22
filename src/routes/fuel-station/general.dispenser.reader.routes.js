const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createGeneralDispenserReader,
  deleteLastGeneralDispenserReader,
  getLastGeneralDispenserReader,
  updateGeneralDispenserReader,
} = require("../../controllers/fuel-station/general.dispenser.reader.controller");
const router = Router();

router.post(
  "/creatGeneralDispenserReader",
  validateJWT,
  createGeneralDispenserReader
);

router.delete(
  "/general-dispenser-reader/last",
  validateJWT,
  deleteLastGeneralDispenserReader
);

router.get(
  "/lastGeneralDispenserId",
  validateJWT,
  getLastGeneralDispenserReader
);
router.put(
  "/updateGeneralDispenserReader",
  validateJWT,
  updateGeneralDispenserReader
);

module.exports = router;
