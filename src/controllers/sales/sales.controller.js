const { response } = require("express");
const SalesControl = require("../../models/sales/salesControl.model");
const GeneralDispenserReader = require("../../models/fuel-station/general.dispenser.reader.models"); // Asegúrate de que la ruta sea correcta

const createSalesControl = async (req, res = response) => {
  try {
    // Buscar el último registro de SalesControl
    const lastSalesControl = await SalesControl.findOne().sort({
      salesDate: -1,
    });

    // Asignar valores por defecto
    const salesDate = lastSalesControl
      ? new Date(lastSalesControl.salesDate.getTime() + 24 * 60 * 60 * 1000)
      : new Date(); // Sumar un día al último salesDate o usar la fecha actual si no hay registros previos

    const noDocument = lastSalesControl ? lastSalesControl.noDocument + 1 : 1; // Sumar 1 al último noDocument o iniciar en 1 si no hay registros previos

    // Valores por defecto para los campos numéricos
    const defaultNumericValue = 0;

    // Buscar el último generalDispenserReaderId
    const lastGeneralDispenserReader =
      await GeneralDispenserReader.findOne().sort({ _id: -1 });
    const generalDispenserReaderId = lastGeneralDispenserReader
      ? lastGeneralDispenserReader._id
      : null; // Asignar el último generalDispenserReaderId o null si no existe

    // Crear una nueva instancia de SalesControl con los valores por defecto y los que vienen del req.body
    const newSalesControl = new SalesControl({
      salesDate,
      noDocument,
      regularPrice: defaultNumericValue,
      superPrice: defaultNumericValue,
      dieselPrice: defaultNumericValue,
      totalGallonRegular: defaultNumericValue,
      totalGallonSuper: defaultNumericValue,
      totalGallonDiesel: defaultNumericValue,
      regularAccumulatedGallons: defaultNumericValue,
      superAccumulatedGallons: defaultNumericValue,
      dieselAccumulatedGallons: defaultNumericValue,
      total: defaultNumericValue,
      balance: defaultNumericValue,
      totalAbonosBalance: defaultNumericValue,
      billIds: req.body.billIds || [],
      valeIds: req.body.valeIds || [],
      couponsIds: req.body.couponsIds || [],
      voucherIds: req.body.voucherIds || [],
      depositsIds: req.body.depositsIds || [],
      creditIds: req.body.creditIds || [],
      bankCheckIds: req.body.bankCheckIds || [],
      abonos: defaultNumericValue,
      userName: req.body.userName,
      generalDispenserReaderId: generalDispenserReaderId,
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
      message: "Nuevo DLP creado ",
      salesControl: savedSalesControl,
    });
  } catch (error) {
    console.error("Error al crear SalesControl:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createSalesControl,
};
