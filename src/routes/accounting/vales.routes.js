const express = require("express");
const router = express.Router();
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createVale,
  getAllVales,
  getValeById,
  updateVale,
  deleteVale,
  getValesSalesControl,
} = require("../../controllers/accounting/vales.controller");

router.post("/createVales", validateJWT, createVale);
router.get("/getAllVales", validateJWT, getAllVales);
router.get("/getValesSalesControl", validateJWT, getValesSalesControl);
router.get("/getValesById/:valeId", validateJWT, getValeById);
router.put("/updateVales/:valeId", validateJWT, updateVale);
router.delete("/deleteVale/:valeId", validateJWT, deleteVale);

module.exports = router;
