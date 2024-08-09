const { response } = require("express");
const Bank = require("../../models/accounting/banks.model"); // Asegúrate de que la ruta sea correcta

// Crear un nuevo banco
const createBank = async (req, res = response) => {
  try {
    const { bankName, accountNumber } = req.body;

    // Verificar si ya existe un banco con el mismo nombre
    const existingBank = await Bank.findOne({ bankName });
    if (existingBank) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un banco con este nombre",
      });
    }

    // Crear una nueva instancia de Bank
    const newBank = new Bank({ bankName, accountNumber });

    // Guardar en la base de datos
    const savedBank = await newBank.save();

    res.status(201).json({
      ok: true,
      msg: "Banco creado exitosamente",
      bank: savedBank,
    });
  } catch (error) {
    console.error("Error al crear banco:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener todos los bancos
const getAllBanks = async (req, res = response) => {
  try {
    const banks = await Bank.find();
    res.json({
      ok: true,
      banks,
      message: "Bancos obtenidos correctamente", // Agrega un mensaje de éxito
    });
  } catch (error) {
    console.error("Error al obtener bancos:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      message: "Hubo un problema al obtener la lista de bancos", // Agrega un mensaje de error
      error: error.message,
    });
  }
};

// Obtener un banco por ID
const getBankById = async (req, res = response) => {
  try {
    const bankId = req.params.id;
    const bank = await Bank.findById(bankId);

    if (!bank) {
      return res.status(404).json({
        ok: false,
        msg: "Banco no encontrado",
      });
    }

    res.json({
      ok: true,
      bank,
    });
  } catch (error) {
    console.error("Error al obtener banco:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Actualizar un banco
const updateBank = async (req, res = response) => {
  try {
    const bankId = req.params.id;
    const { bankName } = req.body;

    const bank = await Bank.findById(bankId);

    if (!bank) {
      return res.status(404).json({
        ok: false,
        msg: "Banco no encontrado",
      });
    }

    // Verificar si el nuevo nombre ya existe (excluyendo el banco actual)
    const existingBank = await Bank.findOne({ bankName, _id: { $ne: bankId } });
    if (existingBank) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe otro banco con este nombre",
      });
    }

    bank.bankName = bankName;
    const updatedBank = await bank.save();

    res.json({
      ok: true,
      msg: "Banco actualizado exitosamente",
      bank: updatedBank,
    });
  } catch (error) {
    console.error("Error al actualizar banco:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Eliminar un banco
const deleteBank = async (req, res = response) => {
  try {
    const bankId = req.params.id;

    const bank = await Bank.findById(bankId);

    if (!bank) {
      return res.status(404).json({
        ok: false,
        msg: "Banco no encontrado",
      });
    }

    await Bank.findByIdAndDelete(bankId);

    res.json({
      ok: true,
      msg: "Banco eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar banco:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createBank,
  getAllBanks,
  getBankById,
  updateBank,
  deleteBank,
};
