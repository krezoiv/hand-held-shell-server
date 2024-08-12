const { response } = require("express");
const Credit = require("../../models/accounting/credits.models");
const SalesControl = require("../../models/sales/salesControl.model");

// Crear un nuevo crédito
const createCredit = async (req, res = response) => {
  try {
    const { creditNumber, creditAmount, creditDate, clientId } = req.body;

    // Verificar si ya existe un crédito con el mismo número
    const existingCredit = await Credit.findOne({ creditNumber });
    if (existingCredit) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un crédito con este número",
      });
    }

    // Buscar el último SalesControl
    const lastSalesControl = await SalesControl.findOne().sort({
      salesDate: -1,
    });

    if (!lastSalesControl) {
      return res.status(400).json({
        ok: false,
        messge: "No se encontró un SalesControl para asignar al crédito",
      });
    }

    // Crear una nueva instancia de Credit con applied por defecto en false
    const newCredit = new Credit({
      applied: false, // Valor por defecto
      creditNumber,
      creditAmount,
      creditDate,
      clientId,
      salesControlId: lastSalesControl._id, // Asignar el último salesControlId
    });

    // Guardar en la base de datos
    const savedCredit = await newCredit.save();

    // Poblar el campo clientId para la respuesta
    await savedCredit.populate("clientId");

    res.status(201).json({
      ok: true,
      message: "Crédito creado exitosamente",
      credit: savedCredit,
    });
  } catch (error) {
    console.error("Error al crear crédito:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener todos los créditos
const getAllCredits = async (req, res = response) => {
  try {
    const credits = await Credit.find().populate("clientId");
    res.json({
      ok: true,
      credits,
    });
  } catch (error) {
    console.error("Error al obtener créditos:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener un crédito por ID
const getCreditById = async (req, res = response) => {
  try {
    const creditId = req.params.id;
    const credit = await Credit.findById(creditId).populate("clientId");

    if (!credit) {
      return res.status(404).json({
        ok: false,
        message: "Crédito no encontrado",
      });
    }

    res.json({
      ok: true,
      credit,
    });
  } catch (error) {
    console.error("Error al obtener crédito:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Actualizar un crédito
const updateCredit = async (req, res = response) => {
  try {
    const creditId = req.params.id;
    const { applied, creditNumber, creditAmount, creditDate, clientId } =
      req.body;

    const credit = await Credit.findById(creditId);

    if (!credit) {
      return res.status(404).json({
        ok: false,
        message: "Crédito no encontrado",
      });
    }

    // Verificar si el nuevo número de crédito ya existe (excluyendo el crédito actual)
    if (creditNumber !== credit.creditNumber) {
      const existingCredit = await Credit.findOne({
        creditNumber,
        _id: { $ne: creditId },
      });
      if (existingCredit) {
        return res.status(400).json({
          ok: false,
          message: "Ya existe otro crédito con este número",
        });
      }
    }

    credit.applied = applied;
    credit.creditNumber = creditNumber;
    credit.creditAmount = creditAmount;
    credit.creditDate = creditDate;
    credit.clientId = clientId;

    const updatedCredit = await credit.save();

    // Poblar el campo clientId para la respuesta
    await updatedCredit.populate("clientId");

    res.json({
      ok: true,
      message: "Crédito actualizado exitosamente",
      credit: updatedCredit,
    });
  } catch (error) {
    console.error("Error al actualizar crédito:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Eliminar un crédito
const deleteCredit = async (req, res = response) => {
  try {
    const creditId = req.params.id;

    const credit = await Credit.findById(creditId);

    if (!credit) {
      return res.status(404).json({
        ok: false,
        message: "Crédito no encontrado",
      });
    }

    await Credit.findByIdAndDelete(creditId);

    res.json({
      ok: true,
      message: "Crédito eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar crédito:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createCredit,
  getAllCredits,
  getCreditById,
  updateCredit,
  deleteCredit,
};
