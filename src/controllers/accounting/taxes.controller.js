const { response } = require("express");
const Taxes = require("../../models/accounting/taxes.model"); // Asegúrate de que la ruta sea correcta

// Crear un nuevo impuesto
const createTax = async (req, res = response) => {
  try {
    const { idpName, idpAmount } = req.body;

    // Verificar si ya existe un impuesto con el mismo nombre
    const existingTax = await Taxes.findOne({ idpName });
    if (existingTax) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un impuesto con este nombre",
      });
    }

    // Crear una nueva instancia de Taxes
    const newTax = new Taxes({
      idpName,
      idpAmount,
    });

    // Guardar en la base de datos
    const savedTax = await newTax.save();

    res.status(201).json({
      ok: true,
      msg: "Impuesto creado exitosamente",
      tax: savedTax,
    });
  } catch (error) {
    console.error("Error al crear impuesto:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener todos los impuestos
const getAllTaxes = async (req, res = response) => {
  try {
    const taxes = await Taxes.find();
    res.json({
      ok: true,
      taxes,
    });
  } catch (error) {
    console.error("Error al obtener impuestos:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener un impuesto por ID
const getTaxById = async (req, res = response) => {
  try {
    const taxId = req.params.id;
    const tax = await Taxes.findById(taxId);

    if (!tax) {
      return res.status(404).json({
        ok: false,
        msg: "Impuesto no encontrado",
      });
    }

    res.json({
      ok: true,
      tax,
    });
  } catch (error) {
    console.error("Error al obtener impuesto:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Actualizar un impuesto
const updateTax = async (req, res = response) => {
  try {
    const taxId = req.params.id;
    const { idpName, idpAmount } = req.body;

    const tax = await Taxes.findById(taxId);

    if (!tax) {
      return res.status(404).json({
        ok: false,
        msg: "Impuesto no encontrado",
      });
    }

    // Verificar si el nuevo nombre de impuesto ya existe (excluyendo el impuesto actual)
    if (idpName !== tax.idpName) {
      const existingTax = await Taxes.findOne({ idpName, _id: { $ne: taxId } });
      if (existingTax) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe otro impuesto con este nombre",
        });
      }
    }

    tax.idpName = idpName;
    tax.idpAmount = idpAmount;

    const updatedTax = await tax.save();

    res.json({
      ok: true,
      msg: "Impuesto actualizado exitosamente",
      tax: updatedTax,
    });
  } catch (error) {
    console.error("Error al actualizar impuesto:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Eliminar un impuesto
const deleteTax = async (req, res = response) => {
  try {
    const taxId = req.params.id;

    const tax = await Taxes.findById(taxId);

    if (!tax) {
      return res.status(404).json({
        ok: false,
        msg: "Impuesto no encontrado",
      });
    }

    await Taxes.findByIdAndDelete(taxId);

    res.json({
      ok: true,
      msg: "Impuesto eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar impuesto:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createTax,
  getAllTaxes,
  getTaxById,
  updateTax,
  deleteTax,
};
