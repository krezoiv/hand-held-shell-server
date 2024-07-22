const { response } = require("express");
const { Types } = require("mongoose");
const Decimal = require("decimal.js");
const DispenserReader = require("../../models/fuel-station/dispenser.readers.model");
const GeneralDispenserReader = require("../../models/fuel-station/general.dispenser.reader.models");
const AssignmentHose = require("../../models/fuel-station/assignment.hose.model");
const Hose = require("../../models/fuel-station/hoses.model");
const Fuel = require("../../models/fuel-station/fuels.model");
const Side = require("../../models/fuel-station/side.dispenser.model");
const Assignment = require("../../models/fuel-station/assignment.model");
const Dispenser = require("../../models/fuel-station/dispensers.model");

const lastNumeration = async (req, res = response) => {
  try {
    const lastGeneralDispenserReader = await GeneralDispenserReader.findOne()
      .sort({ _id: -1 })
      .exec();

    if (!lastGeneralDispenserReader) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró ningún registro en generalDispenserReader.",
      });
    }

    console.log("Last General Dispenser Reader:", lastGeneralDispenserReader);

    const dispenserReaders = await DispenserReader.find({
      generalDispenserReaderId: lastGeneralDispenserReader._id,
    })
      .populate({
        path: "assignmentHoseId",
        populate: [
          {
            path: "hoseId",
            populate: {
              path: "fuelId",
              select: "fuelName",
            },
          },
          {
            path: "sideId",
            select: "sideName",
          },
          {
            path: "assignmentId",
            populate: {
              path: "dispenserId",
              select: "dispenserCode",
            },
          },
        ],
      })
      .exec();

    console.log("Dispenser Readers:", dispenserReaders);

    console.log("Response sent:", {
      ok: true,
      dispenserReaders,
    });

    res.json({
      ok: true,
      dispenserReaders,
    });
  } catch (error) {
    console.error("Error fetching dispenser readers:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
    });
  }
};

const addDispenserReader = async (req, res = response) => {
  try {
    const {
      previousNoGallons,
      actualNoGallons,
      totalNoGallons,
      previousNoMechanic,
      actualNoMechanic,
      totalNoMechanic,
      previousNoMoney,
      actualNoMoney,
      totalNoMoney,
      assignmentHoseId,
      generalDispenserReaderId,
    } = req.body;

    const newDispenserReader = new DispenserReader({
      previousNoGallons: Number(previousNoGallons),
      actualNoGallons: Number(actualNoGallons),
      totalNoGallons: Number(totalNoGallons),
      previousNoMechanic: Number(previousNoMechanic),
      actualNoMechanic: Number(actualNoMechanic),
      totalNoMechanic: Number(totalNoMechanic),
      previousNoMoney: Number(previousNoMoney),
      actualNoMoney: Number(actualNoMoney),
      totalNoMoney: Number(totalNoMoney),
      assignmentHoseId,
      generalDispenserReaderId,
    });

    await newDispenserReader.save();

    res.status(201).json({
      ok: true,
      newDispenserReader,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const updateDispenserReader = async (req, res = response) => {
  try {
    const {
      dispenserReaderId,
      newPreviousNoGallons,
      newActualNoGallons,
      newPreviousNoMechanic,
      newActualNoMechanic,
      newPreviousNoMoney,
      newActualNoMoney,
    } = req.body;

    // 1. Buscar el DispenserReader en la base de datos usando el nuevo ID
    const dispenserReader = await DispenserReader.findById(
      dispenserReaderId
    ).populate({
      path: "assignmentHoseId",
      populate: {
        path: "hoseId",
        populate: {
          path: "fuelId",
          select: "fuelName",
        },
      },
    });

    if (!dispenserReader) {
      return res
        .status(404)
        .json({ ok: false, msg: "DispenserReader no encontrado." });
    }

    // 2. Obtener los valores actuales del DispenserReader
    const dbPreviousNoGallons = dispenserReader.previousNoGallons;
    const dbActualNoGallons = dispenserReader.actualNoGallons;
    const dbTotalNoGallons = dispenserReader.totalNoGallons;
    const dbPreviousNoMechanic = dispenserReader.previousNoMechanic;
    const dbActualNoMechanic = dispenserReader.actualNoMechanic;
    const dbTotalNoMechanic = dispenserReader.totalNoMechanic;
    const dbPreviousNoMoney = dispenserReader.previousNoMoney;
    const dbActualNoMoney = dispenserReader.actualNoMoney;
    const dbTotalNoMoney = dispenserReader.totalNoMoney;
    const dbGeneralDispenserReaderId = dispenserReader.generalDispenserReaderId;

    // 3. Calcular los nuevos totales
    const newTotalGallons = new Decimal(newActualNoGallons)
      .minus(newPreviousNoGallons)
      .toDecimalPlaces(3);
    const newTotalMechanic = new Decimal(newActualNoMechanic)
      .minus(newPreviousNoMechanic)
      .toDecimalPlaces(3);
    const newTotalMoney = new Decimal(newActualNoMoney)
      .minus(newPreviousNoMoney)
      .toDecimalPlaces(3);

    // 4. Actualizar el DispenserReader
    const updatedDispenserReader = await DispenserReader.findByIdAndUpdate(
      dispenserReaderId,
      {
        previousNoGallons: newPreviousNoGallons,
        actualNoGallons: newActualNoGallons,
        totalNoGallons: newTotalGallons.toNumber(),
        previousNoMechanic: newPreviousNoMechanic,
        actualNoMechanic: newActualNoMechanic,
        totalNoMechanic: newTotalMechanic.toNumber(),
        previousNoMoney: newPreviousNoMoney,
        actualNoMoney: newActualNoMoney,
        totalNoMoney: newTotalMoney.toNumber(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedDispenserReader) {
      return res
        .status(404)
        .json({ ok: false, msg: "No se pudo actualizar el DispenserReader." });
    }

    // 5. Obtener el GeneralDispenserReader
    const generalDispenserReader = await GeneralDispenserReader.findById(
      dbGeneralDispenserReaderId
    );

    if (!generalDispenserReader) {
      return res
        .status(404)
        .json({ ok: false, msg: "GeneralDispenserReader no encontrado." });
    }

    const dbTotalGallonRegular = generalDispenserReader.totalGallonRegular;
    const dbTotalMechanicRegular = generalDispenserReader.totalMechanicRegular;
    const dbTotalMoneyRegular = generalDispenserReader.totalMoneyRegular;
    const dbTotalGallonSuper = generalDispenserReader.totalGallonSuper;
    const dbTotalMechanicSuper = generalDispenserReader.totalMechanicSuper;
    const dbTotalMoneySuper = generalDispenserReader.totalMoneySuper;
    const dbTotalGallonDiesel = generalDispenserReader.totalGallonDiesel;
    const dbTotalMechanicDiesel = generalDispenserReader.totalMechanicDiesel;
    const dbTotalMoneyDiesel = generalDispenserReader.totalMoneyDiesel;

    // Verificar si assignmentHoseId y sus propiedades anidadas existen
    const dbFuelName =
      dispenserReader.assignmentHoseId &&
      dispenserReader.assignmentHoseId.hoseId &&
      dispenserReader.assignmentHoseId.hoseId.fuelId &&
      dispenserReader.assignmentHoseId.hoseId.fuelId.fuelName;

    if (!dbFuelName) {
      return res
        .status(400)
        .json({ ok: false, msg: "Información de combustible no encontrada." });
    }

    // 6. Actualizar el GeneralDispenserReader según el tipo de combustible
    let updateFields = {};
    switch (dbFuelName) {
      case "regular":
        updateFields = {
          totalGallonRegular: new Decimal(dbTotalGallonRegular)
            .minus(dbTotalNoGallons)
            .plus(newTotalGallons)
            .toDecimalPlaces(3)
            .toNumber(),
          totalMechanicRegular: new Decimal(dbTotalMechanicRegular)
            .minus(dbTotalNoMechanic)
            .plus(newTotalMechanic)
            .toDecimalPlaces(3)
            .toNumber(),
          totalMoneyRegular: new Decimal(dbTotalMoneyRegular)
            .minus(dbTotalNoMoney)
            .plus(newTotalMoney)
            .toDecimalPlaces(3)
            .toNumber(),
        };
        break;
      case "super":
        updateFields = {
          totalGallonSuper: new Decimal(dbTotalGallonSuper)
            .minus(dbTotalNoGallons)
            .plus(newTotalGallons)
            .toDecimalPlaces(3)
            .toNumber(),
          totalMechanicSuper: new Decimal(dbTotalMechanicSuper)
            .minus(dbTotalNoMechanic)
            .plus(newTotalMechanic)
            .toDecimalPlaces(3)
            .toNumber(),
          totalMoneySuper: new Decimal(dbTotalMoneySuper)
            .minus(dbTotalNoMoney)
            .plus(newTotalMoney)
            .toDecimalPlaces(3)
            .toNumber(),
        };
        break;
      case "diesel":
        updateFields = {
          totalGallonDiesel: new Decimal(dbTotalGallonDiesel)
            .minus(dbTotalNoGallons)
            .plus(newTotalGallons)
            .toDecimalPlaces(3)
            .toNumber(),
          totalMechanicDiesel: new Decimal(dbTotalMechanicDiesel)
            .minus(dbTotalNoMechanic)
            .plus(newTotalMechanic)
            .toDecimalPlaces(3)
            .toNumber(),
          totalMoneyDiesel: new Decimal(dbTotalMoneyDiesel)
            .minus(dbTotalNoMoney)
            .plus(newTotalMoney)
            .toDecimalPlaces(3)
            .toNumber(),
        };
        break;
      default:
        return res
          .status(400)
          .json({ ok: false, msg: "Tipo de combustible no reconocido." });
    }

    const updatedGeneralDispenserReader =
      await GeneralDispenserReader.findByIdAndUpdate(
        dbGeneralDispenserReaderId,
        { $set: updateFields },
        { new: true, runValidators: true }
      );

    if (!updatedGeneralDispenserReader) {
      return res.status(404).json({
        ok: false,
        msg: "No se pudo actualizar el GeneralDispenserReader.",
      });
    }

    res.json({
      ok: true,
      msg: "DispenserReader y GeneralDispenserReader actualizados correctamente.",
      updatedDispenserReader,
      updatedGeneralDispenserReader,
    });
  } catch (error) {
    console.error("Error en updateDispenserReader:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar el lector de dispensador.",
      error: error.message,
    });
  }
};
module.exports = {
  lastNumeration,
  addDispenserReader,
  updateDispenserReader,
};

//todo:
//todo;
