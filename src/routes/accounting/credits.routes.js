const express = require("express");
const {
  createCredit,
  getAllCredits,
  getCreditById,
  updateCredit,
  deleteCredit,
  getCreditsSalesControl,
} = require("../../controllers/accounting/credits.controller");
const { validateJWT } = require("../../middlewares/validate.jwt");
const router = express.Router();

router.post("/createCredits", validateJWT, createCredit);
router.get("/gertAllCredits", validateJWT, getAllCredits);
router.get("/getCreditsSalesControl", validateJWT, getCreditsSalesControl);
router.get("/getCreditById/:creditId", validateJWT, getCreditById);
router.put("/updateCredit/:creditId", validateJWT, updateCredit);
router.delete("/deleteCredit/:creditId", validateJWT, deleteCredit);

module.exports = router;
