const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createBank,
  getAllBanks,
  getBankById,
  updateBank,
  deleteBank,
} = require("../../controllers/accounting/banks.controller");

const router = Router();

router.post("/createBank", validateJWT, createBank);
router.get("/getAllBanks", validateJWT, getAllBanks);
router.get("/getBankById/:bankId", validateJWT, getBankById);
router.put("/updateBank/:bankId", validateJWT, updateBank);
router.delete("/deleteBank/:bankId", validateJWT, deleteBank);

module.exports = router;
