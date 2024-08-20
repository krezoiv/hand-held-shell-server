const { response } = require("express");
const Fuel = require("../../models/fuel-station/fuels.model");
const Status = require("../../models/status/status.models");
const Taxes = require("../../models/accounting/taxes.model");

const getAllFuels = async (req, res = response) => {
  try {
    const fuels = await Fuel.find()
      .populate("statusId", "statusName")
      .populate("taxesId", "idpName idpAmount");

    res.json({
      ok: true,
      fuels,
    });
  } catch (error) {
    console.error("Error al obtener combustibles:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};
const updateFuelPrices = async (req, res = response) => {
  try {
    const { regularPrice, superPrice, dieselPrice } = req.body;

    // Log para verificar los datos recibidos
    console.log("Datos recibidos:", { regularPrice, superPrice, dieselPrice });

    // Actualizar el precio de venta para el combustible "regular"
    const updatedRegular = await Fuel.findOneAndUpdate(
      { fuelName: "regular" },
      { salePrice: regularPrice },
      { new: true }
    );

    // Actualizar el precio de venta para el combustible "super"
    const updatedSuper = await Fuel.findOneAndUpdate(
      { fuelName: "super" },
      { salePrice: superPrice },
      { new: true }
    );

    // Actualizar el precio de venta para el combustible "diesel"
    const updatedDiesel = await Fuel.findOneAndUpdate(
      { fuelName: "diesel" },
      { salePrice: dieselPrice },
      { new: true }
    );

    res.json({
      ok: true,
      msg: "Precios de venta actualizados correctamente",
      updatedRegular,
      updatedSuper,
      updatedDiesel,
    });
  } catch (error) {
    console.error("Error al actualizar los precios de venta:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllFuels,
  updateFuelPrices,
};
