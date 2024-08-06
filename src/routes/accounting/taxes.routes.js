const express = require("express");
const router = express.Router();
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createTax,
  getAllTaxes,
  getTaxById,
  updateTax,
  deleteTax,
} = require("../../controllers/accounting/taxes.controller");

router.post("/createTax", validateJWT, createTax);
router.get("/getAllTaxes", validateJWT, getAllTaxes);
router.get("/getTaxById/:taxId", validateJWT, getTaxById);
router.put("/updateTax/:taxId", validateJWT, updateTax);
router.delete("/deleteTax/:taxId", validateJWT, deleteTax);

module.exports = router;
