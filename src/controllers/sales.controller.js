const { response } = require("express");
const SalesControl = require("../models/sales/salesControl.model"); // Asegúrate de que la ruta sea correcta

const createSalesControl = async (req, res = response) => {
  try {
    const {
      salesDate,
      noDocument,
      regularPrice,
      superPrice,
      dieselPrice,
      totalGallonRegular,
      totalGallonSuper,
      totalGallonDiesel,
      regularAccumulatedGallons,
      superAccumulatedGallons,
      dieselAccumulatedGallons,
      total,
      balance,
      totalAbonosBalance,
      billIds,
      valeIds,
      couponsIds,
      voucherIds,
      depositsIds,
      creditIds,
      bankCheckIds,
      abonos,
      userName,
      generalDispenserReaderId,
    } = req.body;

    // Crear una nueva instancia de SalesControl
    const newSalesControl = new SalesControl({
      salesDate,
      noDocument,
      regularPrice,
      superPrice,
      dieselPrice,
      totalGallonRegular,
      totalGallonSuper,
      totalGallonDiesel,
      regularAccumulatedGallons,
      superAccumulatedGallons,
      dieselAccumulatedGallons,
      total,
      balance,
      totalAbonosBalance,
      billIds,
      valeIds,
      couponsIds,
      voucherIds,
      depositsIds,
      creditIds,
      bankCheckIds,
      abonos,
      userName,
      generalDispenserReaderId,
    });

    // Guardar en la base de datos
    const savedSalesControl = await newSalesControl.save();

    // Poblar los campos referenciados para la respuesta
    await savedSalesControl.populate([
      { path: "billIds" },
      { path: "valeIds" },
      { path: "couponsIds" },
      { path: "voucherIds" },
      { path: "depositsIds" },
      { path: "creditIds" },
      { path: "bankCheckIds" },
      { path: "generalDispenserReaderId" },
    ]);

    res.status(201).json({
      ok: true,
      msg: "SalesControl creado exitosamente",
      salesControl: savedSalesControl,
    });
  } catch (error) {
    console.error("Error al crear SalesControl:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createSalesControl,
};
