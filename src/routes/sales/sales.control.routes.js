const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createSalesControl,
} = require("../../controllers/sales/sales.controller");

const router = Router();

router.post("/newSalesControl", createSalesControl);

module.exports = router;
