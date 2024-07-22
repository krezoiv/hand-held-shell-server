const { Router } = require("express");
const { validateJWT } = require("../../middlewares/validate.jwt");
const rotuer = Router();
const {
  lastNumeration,
  addDispenserReader,
  updateDispenserReader,
} = require("../../controllers/fuel-station/dispenser.reader.controller");

rotuer.get("/lastReaderNumeration", validateJWT, lastNumeration);
rotuer.post("/addDispenserReader", validateJWT, addDispenserReader);
rotuer.put("/updateDispenserReader", validateJWT, updateDispenserReader);

module.exports = rotuer;
