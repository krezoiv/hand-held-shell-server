const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createBill,
  getAllBills,
  getBillById,
  updateBill,
  deleteBill,
} = require("../../controllers/accounting/bills.controller");

const router = Router();

router.post("/createBills", validateJWT, createBill);
router.get("/getAllbills", validateJWT, getAllBills);
router.get("/getbBillById/:billId", validateJWT, getBillById);
router.put("/updateBill/:billId", validateJWT, updateBill);
router.delete("/deleteBill/:billId", validateJWT, deleteBill);

module.exports = router;
