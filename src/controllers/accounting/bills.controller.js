const { response } = require("express");
const Bill = require("../../models/accounting/bills.model"); // Asegúrate de que la ruta sea correcta
const SalesControl = require("../../models/sales/salesControl.model");

// Crear una nueva factura
const createBill = async (req, res = response) => {
  try {
    const { billNumber, billDate, billAmount, billDescription } = req.body;

    // Verificar si ya existe una factura con el mismo número
    const existingBill = await Bill.findOne({ billNumber });
    if (existingBill) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe una factura con este número",
      });
    }

    // Buscar el último registro de SalesControl
    const lastSalesControl = await SalesControl.findOne().sort({
      salesDate: -1,
    });

    if (!lastSalesControl) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró un registro de SalesControl.",
      });
    }

    // Crear una nueva instancia de Bill con el salesControlId del último SalesControl
    const newBill = new Bill({
      billNumber,
      billDate,
      billAmount,
      billDescription,
      salesControlId: lastSalesControl._id,
    });

    // Guardar en la base de datos
    const savedBill = await newBill.save();

    res.status(201).json({
      ok: true,
      message: "Factura creada exitosamente",
      bill: savedBill,
    });
  } catch (error) {
    console.error("Error al crear factura:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener todas las facturas
const getAllBills = async (req, res = response) => {
  try {
    const bills = await Bill.find();
    res.json({
      ok: true,
      bills,
    });
  } catch (error) {
    console.error("Error al obtener facturas:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener una factura por ID
const getBillById = async (req, res = response) => {
  try {
    const billId = req.params.id;
    const bill = await Bill.findById(billId);

    if (!bill) {
      return res.status(404).json({
        ok: false,
        message: "Factura no encontrada",
      });
    }

    res.json({
      ok: true,
      bill,
    });
  } catch (error) {
    console.error("Error al obtener factura:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Actualizar una factura
const updateBill = async (req, res = response) => {
  try {
    const billId = req.params.id;
    const { billNumber, billDate, billAmount, billDescription } = req.body;

    const bill = await Bill.findById(billId);

    if (!bill) {
      return res.status(404).json({
        ok: false,
        message: "Factura no encontrada",
      });
    }

    // Verificar si el nuevo número de factura ya existe (excluyendo la factura actual)
    if (billNumber !== bill.billNumber) {
      const existingBill = await Bill.findOne({
        billNumber,
        _id: { $ne: billId },
      });
      if (existingBill) {
        return res.status(400).json({
          ok: false,
          message: "Ya existe otra factura con este número",
        });
      }
    }

    bill.billNumber = billNumber;
    bill.billDate = billDate;
    bill.billAmount = billAmount;
    bill.billDescription = billDescription;

    const updatedBill = await bill.save();

    res.json({
      ok: true,
      message: "Factura actualizada exitosamente",
      bill: updatedBill,
    });
  } catch (error) {
    console.error("Error al actualizar factura:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Eliminar una factura
const deleteBill = async (req, res = response) => {
  try {
    const billId = req.params.id;

    const bill = await Bill.findById(billId);

    if (!bill) {
      return res.status(404).json({
        ok: false,
        message: "Factura no encontrada",
      });
    }

    await Bill.findByIdAndDelete(billId);

    res.json({
      ok: true,
      message: "Factura eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar factura:", error);
    res.status(500).json({
      ok: false,
      message: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createBill,
  getAllBills,
  getBillById,
  updateBill,
  deleteBill,
};
