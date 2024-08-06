const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const { createSalesControl } = require("../../controllers/sales.controller");

const router = Router();

router.post("/salesControl", createSalesControl);

module.exports = router;
