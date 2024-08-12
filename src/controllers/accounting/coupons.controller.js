const { response } = require("express");
const Coupon = require("../../models/accounting/coupons.model"); // Asegúrate de que la ruta sea correcta
const SalesControl = require("../../models/sales/salesControl.model");

const createCoupon = async (req, res = response) => {
  try {
    const { cuponesNumber, cuponesDate, cuponesAmount } = req.body;

    // Verificar si ya existe un cupón con el mismo número
    const existingCoupon = await Coupon.findOne({ cuponesNumber });
    if (existingCoupon) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un cupón con este número",
      });
    }

    // Buscar el último SalesControl
    const lastSalesControl = await SalesControl.findOne().sort({
      salesDate: -1,
    });

    if (!lastSalesControl) {
      return res.status(400).json({
        ok: false,
        message: "No se encontró un SalesControl para asignar al cupón",
      });
    }

    // Crear una nueva instancia de Coupon con applied por defecto en false
    const newCoupon = new Coupon({
      applied: false, // Valor por defecto
      cuponesNumber,
      cuponesDate,
      cuponesAmount,
      salesControlId: lastSalesControl._id, // Asignar el último salesControlId
    });

    // Guardar en la base de datos
    const savedCoupon = await newCoupon.save();

    res.status(201).json({
      ok: true,
      message: "Cupón creado exitosamente en la db",
      coupon: savedCoupon,
    });
  } catch (error) {
    console.error("Error al crear cupón:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener todos los cupones
const getAllCoupons = async (req, res = response) => {
  try {
    const coupons = await Coupon.find();
    res.json({
      ok: true,
      coupons,
    });
  } catch (error) {
    console.error("Error al obtener cupones:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener un cupón por ID
const getCouponById = async (req, res = response) => {
  try {
    const couponId = req.params.id;
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({
        ok: false,
        msg: "Cupón no encontrado",
      });
    }

    res.json({
      ok: true,
      coupon,
    });
  } catch (error) {
    console.error("Error al obtener cupón:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Actualizar un cupón
const updateCoupon = async (req, res = response) => {
  try {
    const couponId = req.params.id;
    const { applied, cuponesNumber, cuponesDate, cuponesAmount } = req.body;

    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({
        ok: false,
        msg: "Cupón no encontrado",
      });
    }

    // Verificar si el nuevo número de cupón ya existe (excluyendo el cupón actual)
    if (cuponesNumber !== coupon.cuponesNumber) {
      const existingCoupon = await Coupon.findOne({
        cuponesNumber,
        _id: { $ne: couponId },
      });
      if (existingCoupon) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe otro cupón con este número",
        });
      }
    }

    coupon.applied = applied;
    coupon.cuponesNumber = cuponesNumber;
    coupon.cuponesDate = cuponesDate;
    coupon.cuponesAmount = cuponesAmount;

    const updatedCoupon = await coupon.save();

    res.json({
      ok: true,
      msg: "Cupón actualizado exitosamente",
      coupon: updatedCoupon,
    });
  } catch (error) {
    console.error("Error al actualizar cupón:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Eliminar un cupón
const deleteCoupon = async (req, res = response) => {
  try {
    const couponId = req.params.id;

    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({
        ok: false,
        msg: "Cupón no encontrado",
      });
    }

    await Coupon.findByIdAndDelete(couponId);

    res.json({
      ok: true,
      msg: "Cupón eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar cupón:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
