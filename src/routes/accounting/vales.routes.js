const express = require("express");
const router = express.Router();
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createVale,
  getAllVales,
  getValeById,
  updateVale,
  deleteVale,
} = require("../../controllers/accounting/vales.controller");

router.post("/createVales", validateJWT, createVale);
router.get("/getAllVales", validateJWT, getAllVales);
router.get("/getValesById/:valeId", validateJWT, getValeById);
router.put("/updateVales/:valeId", validateJWT, updateVale);
router.delete("/deleteVales/:valeId", validateJWT, deleteVale);

module.exports = router;
