const express = require("express");
const router = express.Router();
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createPOS,
  getAllPOS,
  getPOSById,
  updatePOS,
  deletePOS,
} = require("../../controllers/accounting/pos.controller");

router.post("/createPos", validateJWT, createPOS);
router.get("/getAllPos", validateJWT, getAllPOS);
router.get("/getPosById/:posId", validateJWT, getPOSById);
router.put("/updatePos/:posId", validateJWT, updatePOS);
router.delete("/deletePos/:posId", validateJWT, deletePOS);

module.exports = router;
