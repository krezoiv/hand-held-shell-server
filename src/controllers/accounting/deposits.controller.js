const { response } = require("express");
const Deposit = require("../../models/accounting/deposits.model"); // Asegúrate de que la ruta sea correcta
const SalesControl = require("../../models/sales/salesControl.model");

// Crear un nuevo depósito
const createDeposit = async (req, res = response) => {
  try {
    const { depositNumber, depositAmount, depositDate, bankId } = req.body;

    // Verificar si ya existe un depósito con el mismo número
    const existingDeposit = await Deposit.findOne({ depositNumber });
    if (existingDeposit) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un depósito con este número",
      });
    }

    // Buscar el último SalesControl
    const lastSalesControl = await SalesControl.findOne().sort({
      salesDate: -1,
    });

    if (!lastSalesControl) {
      return res.status(400).json({
        ok: false,
        message: "No se encontró un SalesControl para asignar al depósito",
      });
    }

    // Crear una nueva instancia de Deposit
    const newDeposit = new Deposit({
      depositNumber,
      depositAmount,
      depositDate,
      bankId,
      salesControlId: lastSalesControl._id, // Asignar el último salesControlId
    });

    // Guardar en la base de datos
    const savedDeposit = await newDeposit.save();

    // Poblar el campo bankId para la respuesta
    await savedDeposit.populate("bankId");

    res.status(201).json({
      ok: true,
      message: "Depósito creado exitosamente",
      deposit: savedDeposit,
    });
  } catch (error) {
    console.error("Error al crear depósito:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener todos los depósitos
const getAllDeposits = async (req, res = response) => {
  try {
    const deposits = await Deposit.find().populate("bankId");
    res.json({
      ok: true,
      deposits,
    });
  } catch (error) {
    console.error("Error al obtener depósitos:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener un depósito por ID
const getDepositById = async (req, res = response) => {
  try {
    const depositId = req.params.id;
    const deposit = await Deposit.findById(depositId).populate("bankId");

    if (!deposit) {
      return res.status(404).json({
        ok: false,
        message: "Depósito no encontrado",
      });
    }

    res.json({
      ok: true,
      deposit,
    });
  } catch (error) {
    console.error("Error al obtener depósito:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Actualizar un depósito
const updateDeposit = async (req, res = response) => {
  try {
    const depositId = req.params.id;
    const { depositNumber, depositAmount, depositDate, bankId } = req.body;

    const deposit = await Deposit.findById(depositId);

    if (!deposit) {
      return res.status(404).json({
        ok: false,
        message: "Depósito no encontrado",
      });
    }

    // Verificar si el nuevo número de depósito ya existe (excluyendo el depósito actual)
    if (depositNumber !== deposit.depositNumber) {
      const existingDeposit = await Deposit.findOne({
        depositNumber,
        _id: { $ne: depositId },
      });
      if (existingDeposit) {
        return res.status(400).json({
          ok: false,
          message: "Ya existe otro depósito con este número",
        });
      }
    }

    deposit.depositNumber = depositNumber;
    deposit.depositAmount = depositAmount;
    deposit.depositDate = depositDate;
    deposit.bankId = bankId;

    const updatedDeposit = await deposit.save();

    // Poblar el campo bankId para la respuesta
    await updatedDeposit.populate("bankId");

    res.json({
      ok: true,
      message: "Depósito actualizado exitosamente",
      deposit: updatedDeposit,
    });
  } catch (error) {
    console.error("Error al actualizar depósito:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Eliminar un depósito
const deleteDeposit = async (req, res = response) => {
  try {
    const depositId = req.params.id;

    const deposit = await Deposit.findById(depositId);

    if (!deposit) {
      return res.status(404).json({
        ok: false,
        message: "Depósito no encontrado",
      });
    }

    await Deposit.findByIdAndDelete(depositId);

    res.json({
      ok: true,
      message: "Depósito eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar depósito:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createDeposit,
  getAllDeposits,
  getDepositById,
  updateDeposit,
  deleteDeposit,
};
