const { response } = require("express");
const POS = require("../../models/accounting/pos.model"); // Asegúrate de que la ruta sea correcta

// Crear un nuevo POS
const createPOS = async (req, res = response) => {
  try {
    const { posName } = req.body;

    // Verificar si ya existe un POS con el mismo nombre
    const existingPOS = await POS.findOne({ posName });
    if (existingPOS) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un POS con este nombre",
      });
    }

    // Crear una nueva instancia de POS
    const newPOS = new POS({ posName });

    // Guardar en la base de datos
    const savedPOS = await newPOS.save();

    res.status(201).json({
      ok: true,
      msg: "POS creado exitosamente",
      pos: savedPOS,
    });
  } catch (error) {
    console.error("Error al crear POS:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener todos los POS
const getAllPOS = async (req, res = response) => {
  try {
    const allPOS = await POS.find();
    res.json({
      ok: true,
      pos: allPOS,
    });
  } catch (error) {
    console.error("Error al obtener POS:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener un POS por ID
const getPOSById = async (req, res = response) => {
  try {
    const posId = req.params.id;
    const pos = await POS.findById(posId);

    if (!pos) {
      return res.status(404).json({
        ok: false,
        msg: "POS no encontrado",
      });
    }

    res.json({
      ok: true,
      pos,
    });
  } catch (error) {
    console.error("Error al obtener POS:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Actualizar un POS
const updatePOS = async (req, res = response) => {
  try {
    const posId = req.params.id;
    const { posName } = req.body;

    const pos = await POS.findById(posId);

    if (!pos) {
      return res.status(404).json({
        ok: false,
        msg: "POS no encontrado",
      });
    }

    // Verificar si el nuevo nombre de POS ya existe (excluyendo el POS actual)
    if (posName !== pos.posName) {
      const existingPOS = await POS.findOne({ posName, _id: { $ne: posId } });
      if (existingPOS) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe otro POS con este nombre",
        });
      }
    }

    pos.posName = posName;
    const updatedPOS = await pos.save();

    res.json({
      ok: true,
      msg: "POS actualizado exitosamente",
      pos: updatedPOS,
    });
  } catch (error) {
    console.error("Error al actualizar POS:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Eliminar un POS
const deletePOS = async (req, res = response) => {
  try {
    const posId = req.params.id;

    const pos = await POS.findById(posId);

    if (!pos) {
      return res.status(404).json({
        ok: false,
        msg: "POS no encontrado",
      });
    }

    await POS.findByIdAndDelete(posId);

    res.json({
      ok: true,
      msg: "POS eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar POS:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createPOS,
  getAllPOS,
  getPOSById,
  updatePOS,
  deletePOS,
};
