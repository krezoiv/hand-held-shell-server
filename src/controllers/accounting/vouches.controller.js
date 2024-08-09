const { response } = require("express");
const Voucher = require("../../models/accounting/vouchers.model"); // Asegúrate de que la ruta sea correcta

// Crear un nuevo voucher
const createVoucher = async (req, res = response) => {
  try {
    const { applied, authorizationCode, posId, voucherAmount, voucherDate } =
      req.body;

    // Verificar si ya existe un voucher con el mismo código de autorización
    const existingVoucher = await Voucher.findOne({ authorizationCode });
    if (existingVoucher) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un voucher con este código de autorización",
      });
    }

    // Crear una nueva instancia de Voucher
    const newVoucher = new Voucher({
      applied,
      authorizationCode,
      posId,
      voucherAmount,
      voucherDate,
    });

    // Guardar en la base de datos
    const savedVoucher = await newVoucher.save();

    // Poblar el campo posId para la respuesta
    await savedVoucher.populate("posId");

    res.status(201).json({
      ok: true,
      msg: "Voucher creado exitosamente",
      voucher: savedVoucher,
    });
  } catch (error) {
    console.error("Error al crear voucher:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener todos los vouchers
const getAllVouchers = async (req, res = response) => {
  try {
    const vouchers = await Voucher.find().populate("posId");
    res.json({
      ok: true,
      vouchers,
    });
  } catch (error) {
    console.error("Error al obtener vouchers:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener un voucher por ID
const getVoucherById = async (req, res = response) => {
  try {
    const voucherId = req.params.id;
    const voucher = await Voucher.findById(voucherId).populate("posId");

    if (!voucher) {
      return res.status(404).json({
        ok: false,
        msg: "Voucher no encontrado",
      });
    }

    res.json({
      ok: true,
      voucher,
    });
  } catch (error) {
    console.error("Error al obtener voucher:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Actualizar un voucher
const updateVoucher = async (req, res = response) => {
  try {
    const voucherId = req.params.id;
    const { applied, authorizationCode, posId, voucherAmount, voucherDate } =
      req.body;

    const voucher = await Voucher.findById(voucherId);

    if (!voucher) {
      return res.status(404).json({
        ok: false,
        msg: "Voucher no encontrado",
      });
    }

    // Verificar si el nuevo código de autorización ya existe (excluyendo el voucher actual)
    if (authorizationCode !== voucher.authorizationCode) {
      const existingVoucher = await Voucher.findOne({
        authorizationCode,
        _id: { $ne: voucherId },
      });
      if (existingVoucher) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe otro voucher con este código de autorización",
        });
      }
    }

    voucher.applied = applied;
    voucher.authorizationCode = authorizationCode;
    voucher.posId = posId;
    voucher.voucherAmount = voucherAmount;
    voucher.voucherDate = voucherDate;

    const updatedVoucher = await voucher.save();

    // Poblar el campo posId para la respuesta
    await updatedVoucher.populate("posId");

    res.json({
      ok: true,
      msg: "Voucher actualizado exitosamente",
      voucher: updatedVoucher,
    });
  } catch (error) {
    console.error("Error al actualizar voucher:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Eliminar un voucher
const deleteVoucher = async (req, res = response) => {
  try {
    const voucherId = req.params.id;

    const voucher = await Voucher.findById(voucherId);

    if (!voucher) {
      return res.status(404).json({
        ok: false,
        msg: "Voucher no encontrado",
      });
    }

    await Voucher.findByIdAndDelete(voucherId);

    res.json({
      ok: true,
      msg: "Voucher eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar voucher:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
};
