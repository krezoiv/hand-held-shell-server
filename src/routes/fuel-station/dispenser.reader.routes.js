const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const rotuer = Router();
const {
  lastNumeration,
  addDispenserReader,
  updateDispenserReader,
  penultimetaNumeration,
  getDispenserReaderById,
} = require("../../controllers/fuel-station/dispenser.reader.controller");

rotuer.get("/lastReaderNumeration", validateJWT, lastNumeration);
rotuer.get("/penultimateReaderNumeration", validateJWT, penultimetaNumeration);
rotuer.post("/addDispenserReader", validateJWT, addDispenserReader);
rotuer.put("/updateDispenserReader", validateJWT, updateDispenserReader);
rotuer.get(
  "/dispenserReadarById/:dispenserReaderId",
  validateJWT,
  getDispenserReaderById
);

module.exports = rotuer;
