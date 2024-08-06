const express = require("express");
const router = express.Router();
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
} = require("../../controllers/persons/stores.controller");

router.post("/createStores", validateJWT, createStore);
router.get("/getAllStores", validateJWT, getAllStores);
router.get("/getStoreById/:storeId", validateJWT, getStoreById);
router.put("/updateStore/:storeId", validateJWT, updateStore);
router.delete("/deleteStores/:sotoreId", validateJWT, deleteStore);

module.exports = router;
