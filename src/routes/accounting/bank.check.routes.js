const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createBankCheck,
  getBankChecksSalesControl,
  deleteBankCheck,
} = require("../../controllers/accounting/bank.check.controller");

const router = Router();

router.post("/createBankCheck", validateJWT, createBankCheck);
router.get(
  "/getBankChecksSalesControl",
  validateJWT,
  getBankChecksSalesControl
);

router.delete("/deleteBankCheck/:bankCheckId", validateJWT, deleteBankCheck);
module.exports = router;
