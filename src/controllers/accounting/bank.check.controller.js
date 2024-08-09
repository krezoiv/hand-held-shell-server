const { response } = require("express");
const BankCheck = require("../../models/accounting/bank.check.model"); // Asegúrate de que la ruta sea correcta

const createBankCheck = async (req, res = response) => {
  try {
    const { checkNumber, amount, checkDate, bankId, clientId } = req.body;

    // Crear una nueva instancia de BankCheck
    const newBankCheck = new BankCheck({
      checkNumber,
      amount,
      checkDate,
      bankId,
      clientId,
    });

    // Guardar en la base de datos
    const savedBankCheck = await newBankCheck.save();

    // Poblar los campos referenciados para la respuesta
    await savedBankCheck.populate([{ path: "bankId" }, { path: "clientId" }]);

    res.status(201).json({
      ok: true,
      msg: "Cheque bancario creado exitosamente",
      bankCheck: savedBankCheck,
    });
  } catch (error) {
    console.error("Error al crear cheque bancario:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createBankCheck,
};
