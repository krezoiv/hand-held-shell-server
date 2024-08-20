const { response } = require("express");
const SalesControl = require("../../models/sales/salesControl.model");
const BankChecks = require("../../models/accounting/bank.check.model");
const Bills = require("../../models/accounting/bills.model");
const Coupons = require("../../models/accounting/coupons.model");
const Credits = require("../../models/accounting/credits.models");
const Deposits = require("../../models/accounting/deposits.model");
const Vales = require("../../models/accounting/vales.model");
const Vouchers = require("../../models/accounting/vouchers.model");
const GeneralDispenserReader = require("../../models/fuel-station/general.dispenser.reader.models"); // Asegúrate de que la ruta sea correcta
const createSalesControl = async (req, res = response) => {
  try {
    const lastSalesControl = await SalesControl.findOne().sort({
      salesDate: -1,
    });

    if (lastSalesControl && !lastSalesControl.applied) {
      console.log(
        "El último DLP no ha sido aplicado, no se puede crear uno nuevo."
      );
      return res.status(400).json({
        ok: false,
        message:
          "No se puede crear un nuevo DLP porque el último aún no ha sido aplicado.",
      });
    }

    const salesDate = lastSalesControl
      ? new Date(lastSalesControl.salesDate.getTime() + 24 * 60 * 60 * 1000)
      : new Date();

    const noDocument = lastSalesControl ? lastSalesControl.noDocument + 1 : 1;

    const newSalesControl = new SalesControl({
      applied: false,
      salesDate,
      noDocument,
      regularPrice: 0,
      superPrice: 0,
      dieselPrice: 0,
      totalGallonRegular: 0,
      totalGallonSuper: 0,
      totalGallonDiesel: 0,
      regularAccumulatedGallons: 0,
      superAccumulatedGallons: 0,
      dieselAccumulatedGallons: 0,
      total: 0,
      balance: 0,
      totalAbonosBalance: 0,
      billIds: req.body.billIds || [],
      valeIds: req.body.valeIds || [],
      couponsIds: req.body.couponsIds || [],
      voucherIds: req.body.voucherIds || [],
      depositsIds: req.body.depositsIds || [],
      creditIds: req.body.creditIds || [],
      bankCheckIds: req.body.bankCheckIds || [],
      abonos: 0,
      userName: req.body.userName,
    });

    console.log(
      "Intentando guardar el nuevo SalesControl en la base de datos..."
    );

    const savedSalesControl = await newSalesControl.save();

    console.log("SalesControl guardado con éxito:", savedSalesControl);

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
      message: "Nuevo DLP creado",
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

const updateSalesControl = async (req, res = response) => {
  try {
    // Buscar el último registro de SalesControl
    const lastSalesControl = await SalesControl.findOne().sort({
      salesDate: -1,
    });

    if (!lastSalesControl) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró un registro de SalesControl para actualizar.",
      });
    }

    const salesControlId = lastSalesControl._id;

    // Buscar el último registro de GeneralDispenserReader
    const lastGeneralDispenserReader =
      await GeneralDispenserReader.findOne().sort({
        readingDate: -1,
      });

    if (!lastGeneralDispenserReader) {
      return res.status(404).json({
        ok: false,
        message:
          "No se encontró un registro de GeneralDispenserReader para actualizar.",
      });
    }

    // Marcar el campo "applied" como true
    lastGeneralDispenserReader.applied = true;
    await lastGeneralDispenserReader.save();

    // Buscar los documentos relacionados con el salesControlId en las diferentes colecciones
    const [bankChecks, bills, coupons, credits, deposits, vales, vouchers] =
      await Promise.all([
        BankChecks.find({ salesControlId }),
        Bills.find({ salesControlId }),
        Coupons.find({ salesControlId }),
        Credits.find({ salesControlId }),
        Deposits.find({ salesControlId }),
        Vales.find({ salesControlId }),
        Vouchers.find({ salesControlId }),
      ]);

    // Extraer los IDs de los documentos encontrados
    const bankCheckIds = bankChecks.map((doc) => doc._id);
    const billIds = bills.map((doc) => doc._id);
    const couponsIds = coupons.map((doc) => doc._id);
    const creditIds = credits.map((doc) => doc._id);
    const depositsIds = deposits.map((doc) => doc._id);
    const valeIds = vales.map((doc) => doc._id);
    const voucherIds = vouchers.map((doc) => doc._id);

    // Actualizar los campos con los valores del req.body o con los IDs encontrados
    const updatedSalesControl = await SalesControl.findByIdAndUpdate(
      salesControlId,
      {
        regularPrice: req.body.regularPrice || 0,
        superPrice: req.body.superPrice || 0,
        dieselPrice: req.body.dieselPrice || 0,
        totalGallonRegular: req.body.totalGallonRegular || 0,
        totalGallonSuper: req.body.totalGallonSuper || 0,
        totalGallonDiesel: req.body.totalGallonDiesel || 0,
        regularAccumulatedGallons: req.body.regularAccumulatedGallons || 0,
        superAccumulatedGallons: req.body.superAccumulatedGallons || 0,
        dieselAccumulatedGallons: req.body.dieselAccumulatedGallons || 0,
        total: req.body.total || 0,
        balance: req.body.balance || 0,
        totalAbonosBalance: req.body.totalAbonosBalance || 0,
        billIds: billIds.length > 0 ? billIds : req.body.billIds || [],
        valeIds: valeIds.length > 0 ? valeIds : req.body.valeIds || [],
        couponsIds:
          couponsIds.length > 0 ? couponsIds : req.body.couponsIds || [],
        voucherIds:
          voucherIds.length > 0 ? voucherIds : req.body.voucherIds || [],
        depositsIds:
          depositsIds.length > 0 ? depositsIds : req.body.depositsIds || [],
        creditIds: creditIds.length > 0 ? creditIds : req.body.creditIds || [],
        bankCheckIds:
          bankCheckIds.length > 0 ? bankCheckIds : req.body.bankCheckIds || [],
        abonos: req.body.abonos || 0,
        generalDispenserReaderId: lastGeneralDispenserReader._id, // Asociar el último GeneralDispenserReader
      },
      { new: true, runValidators: true }
    );

    // Poblar los campos referenciados para la respuesta
    await updatedSalesControl.populate([
      { path: "billIds" },
      { path: "valeIds" },
      { path: "couponsIds" },
      { path: "voucherIds" },
      { path: "depositsIds" },
      { path: "creditIds" },
      { path: "bankCheckIds" },
      { path: "generalDispenserReaderId" },
    ]);

    res.status(200).json({
      ok: true,
      message: "SalesControl actualizado con éxito",
      salesControl: updatedSalesControl,
    });
  } catch (error) {
    console.error("Error al actualizar SalesControl:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

const getLastSalesControl = async (req, res = response) => {
  try {
    // Buscar el último registro de SalesControl
    const lastSalesControl = await SalesControl.findOne().sort({
      salesDate: -1,
    });

    if (!lastSalesControl) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró ningún SalesControl.",
      });
    }

    res.status(200).json({
      ok: true,
      salesControl: lastSalesControl,
    });
  } catch (error) {
    console.error("Error al obtener el último SalesControl:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createSalesControl,
  getLastSalesControl,
  updateSalesControl,
};
