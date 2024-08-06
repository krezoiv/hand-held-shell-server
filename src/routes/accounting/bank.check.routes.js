const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createBankCheck,
} = require("../../controllers/accounting/bank.check.controller");

const router = Router();

router.post("/newBankCheck", validateJWT, createBankCheck);

module.exports = router;
