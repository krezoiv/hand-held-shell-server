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

const getDispenserReaderById = async (req, res = response) => {
  try {
    const { dispenserReaderId } = req.params;

    const dispenserReader = await DispenserReader.findById(dispenserReaderId)
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

    if (!dispenserReader) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró ningún DispenserReader con el ID proporcionado.",
      });
    }

    console.log("Dispenser Reader:", dispenserReader);

    res.json({
      ok: true,
      dispenserReader,
    });
  } catch (error) {
    console.error("Error fetching dispenser reader by ID:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
    });
  }
};

const penultimetaNumeration = async (req, res = response) => {
  try {
    // Buscar el penúltimo registro en lugar del último
    const penultimateGeneralDispenserReader =
      await GeneralDispenserReader.findOne()
        .sort({ _id: -1 })
        .skip(1) // Saltar el último registro
        .exec();

    if (!penultimateGeneralDispenserReader) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró ningún registro en generalDispenserReader.",
      });
    }

    console.log(
      "Penultimate General Dispenser Reader:",
      penultimateGeneralDispenserReader
    );

    const dispenserReaders = await DispenserReader.find({
      generalDispenserReaderId: penultimateGeneralDispenserReader._id,
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

    const savedDispenserReader = await newDispenserReader.save();
    console.log(savedDispenserReader._id);
    res.status(201).json({
      ok: true,
      newDispenserReader: savedDispenserReader,
      dispenserReaderId: savedDispenserReader._id,
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

    console.log("Datos recibidos:", {
      dispenserReaderId,
      newPreviousNoGallons,
      newActualNoGallons,
      newPreviousNoMechanic,
      newActualNoMechanic,
      newPreviousNoMoney,
      newActualNoMoney,
    });

    const cleanNumber = (num) => {
      if (typeof num === "string") {
        return num.replace(/,/g, "");
      }
      return num;
    };

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

    const dbFuelName =
      dispenserReader.assignmentHoseId?.hoseId?.fuelId?.fuelName;

    if (!dbFuelName) {
      return res
        .status(400)
        .json({ ok: false, msg: "Información de combustible no encontrada." });
    }

    console.log("Nombre del combustible:", dbFuelName);

    // Usar los valores existentes si los nuevos no están definidos
    const previousNoGallons =
      newPreviousNoGallons ?? dispenserReader.previousNoGallons;
    const actualNoGallons =
      newActualNoGallons ?? dispenserReader.actualNoGallons;
    const previousNoMechanic =
      newPreviousNoMechanic ?? dispenserReader.previousNoMechanic;
    const actualNoMechanic =
      newActualNoMechanic ?? dispenserReader.actualNoMechanic;
    const previousNoMoney =
      newPreviousNoMoney ?? dispenserReader.previousNoMoney;
    const actualNoMoney = newActualNoMoney ?? dispenserReader.actualNoMoney;

    const newTotalGallons = new Decimal(cleanNumber(actualNoGallons))
      .minus(cleanNumber(previousNoGallons))
      .toDecimalPlaces(3);
    const newTotalMechanic = new Decimal(cleanNumber(actualNoMechanic))
      .minus(cleanNumber(previousNoMechanic))
      .toDecimalPlaces(3);
    const newTotalMoney = new Decimal(cleanNumber(actualNoMoney))
      .minus(cleanNumber(previousNoMoney))
      .toDecimalPlaces(3);

    console.log("Nuevos totales calculados:", {
      newTotalGallons: newTotalGallons.toString(),
      newTotalMechanic: newTotalMechanic.toString(),
      newTotalMoney: newTotalMoney.toString(),
    });

    const updatedDispenserReader = await DispenserReader.findByIdAndUpdate(
      dispenserReaderId,
      {
        previousNoGallons: cleanNumber(previousNoGallons),
        actualNoGallons: cleanNumber(actualNoGallons),
        totalNoGallons: newTotalGallons.toNumber(),
        previousNoMechanic: cleanNumber(previousNoMechanic),
        actualNoMechanic: cleanNumber(actualNoMechanic),
        totalNoMechanic: newTotalMechanic.toNumber(),
        previousNoMoney: cleanNumber(previousNoMoney),
        actualNoMoney: cleanNumber(actualNoMoney),
        totalNoMoney: newTotalMoney.toNumber(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedDispenserReader) {
      return res
        .status(404)
        .json({ ok: false, msg: "No se pudo actualizar el DispenserReader." });
    }

    const generalDispenserReader = await GeneralDispenserReader.findById(
      dispenserReader.generalDispenserReaderId
    );

    if (!generalDispenserReader) {
      return res
        .status(404)
        .json({ ok: false, msg: "GeneralDispenserReader no encontrado." });
    }

    let updateFields = {};
    switch (dbFuelName) {
      case "regular":
        updateFields = {
          totalGallonRegular: new Decimal(
            generalDispenserReader.totalGallonRegular
          )
            .minus(dispenserReader.totalNoGallons)
            .plus(newTotalGallons)
            .toDecimalPlaces(3)
            .toNumber(),
          totalMechanicRegular: new Decimal(
            generalDispenserReader.totalMechanicRegular
          )
            .minus(dispenserReader.totalNoMechanic)
            .plus(newTotalMechanic)
            .toDecimalPlaces(3)
            .toNumber(),
          totalMoneyRegular: new Decimal(
            generalDispenserReader.totalMoneyRegular
          )
            .minus(dispenserReader.totalNoMoney)
            .plus(newTotalMoney)
            .toDecimalPlaces(3)
            .toNumber(),
        };
        break;
      case "super":
        updateFields = {
          totalGallonSuper: new Decimal(generalDispenserReader.totalGallonSuper)
            .minus(dispenserReader.totalNoGallons)
            .plus(newTotalGallons)
            .toDecimalPlaces(3)
            .toNumber(),
          totalMechanicSuper: new Decimal(
            generalDispenserReader.totalMechanicSuper
          )
            .minus(dispenserReader.totalNoMechanic)
            .plus(newTotalMechanic)
            .toDecimalPlaces(3)
            .toNumber(),
          totalMoneySuper: new Decimal(generalDispenserReader.totalMoneySuper)
            .minus(dispenserReader.totalNoMoney)
            .plus(newTotalMoney)
            .toDecimalPlaces(3)
            .toNumber(),
        };
        break;
      case "diesel":
        updateFields = {
          totalGallonDiesel: new Decimal(
            generalDispenserReader.totalGallonDiesel
          )
            .minus(dispenserReader.totalNoGallons)
            .plus(newTotalGallons)
            .toDecimalPlaces(3)
            .toNumber(),
          totalMechanicDiesel: new Decimal(
            generalDispenserReader.totalMechanicDiesel
          )
            .minus(dispenserReader.totalNoMechanic)
            .plus(newTotalMechanic)
            .toDecimalPlaces(3)
            .toNumber(),
          totalMoneyDiesel: new Decimal(generalDispenserReader.totalMoneyDiesel)
            .minus(dispenserReader.totalNoMoney)
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

    console.log(
      "Campos de actualización para GeneralDispenserReader:",
      updateFields
    );

    const updatedGeneralDispenserReader =
      await GeneralDispenserReader.findByIdAndUpdate(
        dispenserReader.generalDispenserReaderId,
        { $set: updateFields },
        { new: true, runValidators: true }
      );

    if (!updatedGeneralDispenserReader) {
      return res.status(404).json({
        ok: false,
        msg: "No se pudo actualizar el GeneralDispenserReader.",
      });
    }

    console.log(
      "Intentando actualizar DispenserReader con ID:",
      dispenserReaderId
    );
    console.log("Datos de actualización:", {
      previousNoGallons: cleanNumber(newPreviousNoGallons),
      actualNoGallons: cleanNumber(newActualNoGallons),
      totalNoGallons: newTotalGallons.toNumber(),
      previousNoMechanic: cleanNumber(newPreviousNoMechanic),
      actualNoMechanic: cleanNumber(newActualNoMechanic),
      totalNoMechanic: newTotalMechanic.toNumber(),
      previousNoMoney: cleanNumber(newPreviousNoMoney),
      actualNoMoney: cleanNumber(newActualNoMoney),
      totalNoMoney: newTotalMoney.toNumber(),
    });
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
  penultimetaNumeration,
  addDispenserReader,
  updateDispenserReader,
  getDispenserReaderById,
};
