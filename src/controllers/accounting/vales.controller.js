const { response } = require("express");
const Vale = require("../../models/accounting/vales.model"); // Asegúrate de que la ruta sea correcta

// Crear un nuevo vale
const createVale = async (req, res = response) => {
  try {
    const { valeNumber, valeDate, valeAmount } = req.body;

    // Verificar si ya existe un vale con el mismo número
    const existingVale = await Vale.findOne({ valeNumber });
    if (existingVale) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un vale con este número",
      });
    }

    // Crear una nueva instancia de Vale
    const newVale = new Vale({
      valeNumber,
      valeDate,
      valeAmount,
    });

    // Guardar en la base de datos
    const savedVale = await newVale.save();

    res.status(201).json({
      ok: true,
      msg: "Vale creado exitosamente",
      vale: savedVale,
    });
  } catch (error) {
    console.error("Error al crear vale:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener todos los vales
const getAllVales = async (req, res = response) => {
  try {
    const vales = await Vale.find();
    res.json({
      ok: true,
      vales,
    });
  } catch (error) {
    console.error("Error al obtener vales:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener un vale por ID
const getValeById = async (req, res = response) => {
  try {
    const valeId = req.params.id;
    const vale = await Vale.findById(valeId);

    if (!vale) {
      return res.status(404).json({
        ok: false,
        msg: "Vale no encontrado",
      });
    }

    res.json({
      ok: true,
      vale,
    });
  } catch (error) {
    console.error("Error al obtener vale:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Actualizar un vale
const updateVale = async (req, res = response) => {
  try {
    const valeId = req.params.id;
    const { valeNumber, valeDate, valeAmount } = req.body;

    const vale = await Vale.findById(valeId);

    if (!vale) {
      return res.status(404).json({
        ok: false,
        msg: "Vale no encontrado",
      });
    }

    // Verificar si el nuevo número de vale ya existe (excluyendo el vale actual)
    if (valeNumber !== vale.valeNumber) {
      const existingVale = await Vale.findOne({
        valeNumber,
        _id: { $ne: valeId },
      });
      if (existingVale) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe otro vale con este número",
        });
      }
    }

    vale.valeNumber = valeNumber;
    vale.valeDate = valeDate;
    vale.valeAmount = valeAmount;

    const updatedVale = await vale.save();

    res.json({
      ok: true,
      msg: "Vale actualizado exitosamente",
      vale: updatedVale,
    });
  } catch (error) {
    console.error("Error al actualizar vale:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Eliminar un vale
const deleteVale = async (req, res = response) => {
  try {
    const valeId = req.params.id;

    const vale = await Vale.findById(valeId);

    if (!vale) {
      return res.status(404).json({
        ok: false,
        msg: "Vale no encontrado",
      });
    }

    await Vale.findByIdAndDelete(valeId);

    res.json({
      ok: true,
      msg: "Vale eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar vale:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createVale,
  getAllVales,
  getValeById,
  updateVale,
  deleteVale,
};
