const { response } = require("express");
const GeneralDispenserReader = require("../../models/fuel-station/general.dispenser.reader.models");
const AssignmentHose = require("../../models/fuel-station/assignment.hose.model");
const SalesControl = require("../../models/sales/salesControl.model");

const createGeneralDispenserReader = async (req, res = response) => {
  try {
    // Buscar el último registro en GeneralDispenserReader
    const lastReader = await GeneralDispenserReader.findOne().sort({
      readingDate: -1,
    });

    // Verificar si el último registro existe y si el campo 'applied' es false
    if (lastReader && !lastReader.applied) {
      return res.status(400).json({
        ok: false,
        msg: "El día anterior no se ha cerrado",
      });
    }

    // Buscar el último registro en SalesControl
    const lastSalesControl = await SalesControl.findOne().sort({
      salesDate: -1,
    });

    // Si existe un SalesControl, actualizar su campo 'applied' a true
    if (lastSalesControl) {
      lastSalesControl.applied = true;
      await lastSalesControl.save();
    }

    // Obtener la fecha y hora actual en Guatemala
    const currentDateTimeInGuatemala = new Date().toLocaleString("en-US", {
      timeZone: "America/Guatemala",
    });
    const readingDate = new Date(currentDateTimeInGuatemala);

    // Calcular la nueva fecha de lectura sumando un día al último registro
    let newReadingDate;
    if (lastReader) {
      newReadingDate = new Date(lastReader.readingDate);
      newReadingDate.setDate(newReadingDate.getDate() + 1);
    } else {
      newReadingDate = readingDate;
    }

    // Crear un nuevo registro en GeneralDispenserReader
    const newReader = new GeneralDispenserReader({
      applied: false,
      totalGallonRegular: 0,
      totalMechanicRegular: 0,
      totalMoneyRegular: 0,
      totalGallonSuper: 0,
      totalMechanicSuper: 0,
      totalMoneySuper: 0,
      totalGallonDiesel: 0,
      totalMechanicDiesel: 0,
      totalMoneyDiesel: 0,
      totalGallonVpower: 0,
      totalMechanicVpower: 0,
      totalMoneyVpower: 0,
      readingDate: newReadingDate,
    });

    await newReader.save();

    res.status(201).json({
      ok: true,
      generalDispenserReader: newReader,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const deleteLastGeneralDispenserReader = async (req, res = response) => {
  try {
    const lastReader = await GeneralDispenserReader.findOne().sort({
      readingDate: -1,
    });

    if (!lastReader) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró ningún registro",
      });
    }

    await GeneralDispenserReader.findByIdAndDelete(lastReader._id);

    res.status(200).json({
      ok: true,
      msg: "Último registro eliminado exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const getLastGeneralDispenserReader = async (req, res = response) => {
  try {
    const lastReader = await GeneralDispenserReader.findOne().sort({
      readingDate: -1,
    });

    if (!lastReader) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró ningún registro de GeneralDispenserReader",
      });
    }

    res.status(200).json({
      ok: true,
      generalDispenserReader: lastReader,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const updateGeneralDispenserReader = async (req, res = response) => {
  try {
    const {
      totalNoGallons,
      totalNoMechanic,
      totalNoMoney,
      assignmentHoseId,
      generalDispenserReaderId,
    } = req.body;

    // Buscar el fuelName correspondiente al assignmentHoseId
    const assignment = await AssignmentHose.findById(assignmentHoseId).populate(
      {
        path: "hoseId",
        populate: {
          path: "fuelId",
          select: "fuelName",
        },
      }
    );

    if (!assignment) {
      return res.status(404).json({
        ok: false,
        msg: "AssignmentHose no encontrado",
      });
    }

    const fuelName = assignment.hoseId.fuelId.fuelName.toLowerCase();

    // Preparar el objeto de actualización
    let updateObject = {};

    switch (fuelName) {
      case "regular":
        updateObject = {
          $inc: {
            totalGallonRegular: Number(totalNoGallons),
            totalMechanicRegular: Number(totalNoMechanic),
            totalMoneyRegular: Number(totalNoMoney),
          },
        };
        break;
      case "super":
        updateObject = {
          $inc: {
            totalGallonSuper: Number(totalNoGallons),
            totalMechanicSuper: Number(totalNoMechanic),
            totalMoneySuper: Number(totalNoMoney),
          },
        };
        break;
      case "diesel":
        updateObject = {
          $inc: {
            totalGallonDiesel: Number(totalNoGallons),
            totalMechanicDiesel: Number(totalNoMechanic),
            totalMoneyDiesel: Number(totalNoMoney),
          },
        };
        break;
      default:
        return res.status(400).json({
          ok: false,
          msg: `Tipo de combustible no reconocido: ${fuelName}`,
        });
    }

    // Realizar la actualización
    const updatedGeneralDispenser =
      await GeneralDispenserReader.findByIdAndUpdate(
        generalDispenserReaderId,
        updateObject,
        { new: true, runValidators: true }
      );

    if (!updatedGeneralDispenser) {
      return res.status(404).json({
        ok: false,
        msg: "GeneralDispenserReader no encontrado",
      });
    }

    res.status(200).json({
      ok: true,
      updatedGeneralDispenser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
module.exports = {
  createGeneralDispenserReader,
  deleteLastGeneralDispenserReader,
  getLastGeneralDispenserReader,
  updateGeneralDispenserReader,
};
