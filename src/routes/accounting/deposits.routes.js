const express = require("express");
const router = express.Router();
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createDeposit,
  getAllDeposits,
  getDepositById,
  updateDeposit,
  deleteDeposit,
  getDepositsSaleControl,
} = require("../../controllers/accounting/deposits.controller");

router.post("/createDeposits", validateJWT, createDeposit);
router.get("/getAllDeposits", validateJWT, getAllDeposits);
router.get("/getDepositsSaleControl", validateJWT, getDepositsSaleControl);
router.get("/getDeposit/:depositId", validateJWT, getDepositById);
router.put("/updateDeposit/:depositId", validateJWT, updateDeposit);
router.delete("/deleteDeposit/:depositId", validateJWT, deleteDeposit);

module.exports = router;
