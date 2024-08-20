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

const getBankChecksSalesControl = async (req, res = response) => {
  try {
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

    const bankCheck = await BankCheck.find({
      salesControlId: lastSalesControl._id,
    })
      .populate("clientId")
      .populate("bankId");
    res.json({
      ok: true,
      bankCheck,
    });
  } catch (error) {
    console.error("Error al obtener cheques:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

const deleteBankCheck = async (req, res = response) => {
  try {
    const bankCheckId = req.params.bankCheckId;

    const bankCheck = await BankCheck.findById(bankCheckId);

    if (!bankCheck) {
      return res.status(404).json({
        ok: false,
        message: "Cheque no encontrado",
      });
    }

    await BankCheck.findByIdAndDelete(bankCheckId);

    res.json({
      ok: true,
      voucher: bankCheck,
      message: "Cheque eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar cheque:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};
module.exports = {
  createBankCheck,
  getBankChecksSalesControl,
  deleteBankCheck,
};
