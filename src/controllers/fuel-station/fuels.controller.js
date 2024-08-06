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

module.exports = {
  getAllFuels,
};
