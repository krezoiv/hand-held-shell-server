const { response } = require("express");
const BankCheck = require("../../models/accounting/bank.check.model"); // Asegúrate de que la ruta sea correcta
const SalesControl = require("../../models/sales/salesControl.model");
const createBankCheck = async (req, res = response) => {
  try {
    const { checkNumber, checkValue, checkDate, bankId, clientId } = req.body;

    // Buscar el último registro de SalesControl
    const lastSalesControl = await SalesControl.findOne().sort({
      salesDate: -1,
    });

    if (!lastSalesControl) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró un registro de SalesControl.",
      });
    }

    // Crear una nueva instancia de BankCheck con el salesControlId del último SalesControl
    const newBankCheck = new BankCheck({
      applied: false,
      checkNumber,
      checkValue,
      checkDate,
      bankId,
      clientId,
      salesControlId: lastSalesControl._id,
    });

    // Guardar en la base de datos
    const savedBankCheck = await newBankCheck.save();

    // Poblar los campos referenciados para la respuesta
    await savedBankCheck.populate([{ path: "bankId" }, { path: "clientId" }]);

    res.status(201).json({
      ok: true,
      message: "Cheque bancario creado exitosamente",
      bankCheck: savedBankCheck,
    });
  } catch (error) {
    console.error("Error al crear cheque bancario:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createBankCheck,
};
