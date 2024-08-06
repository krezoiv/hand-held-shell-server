const express = require("express");
const router = express.Router();
const { validateJWT } = require("../../middlewares/validate.jwt");
const {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../../controllers/persons/clients.controller");

router.post("/createClients", validateJWT, createClient);
router.get("/getAllClients", validateJWT, getAllClients);
router.get("/getClientById/:id", validateJWT, getClientById);
router.put("/updateClient/:id", validateJWT, updateClient);
router.delete("/deleteClient/:id", validateJWT, deleteClient);

module.exports = router;
