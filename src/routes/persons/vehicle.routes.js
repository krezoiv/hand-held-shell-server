const express = require("express");
const router = express.Router();
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../../controllers/persons/vehicle.controller");

router.post("/crateVehicles", validateJWT, createVehicle);
router.get("/getAllVehicles", validateJWT, getAllVehicles);
router.get("/getVehicleById/:vehicleId", validateJWT, getVehicleById);
router.put("/updateVehicles/:vechileId", validateJWT, updateVehicle);
router.delete("/deleteVehicles/:vehicleId", validateJWT, deleteVehicle);

module.exports = router;
