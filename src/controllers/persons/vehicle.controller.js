const { response } = require("express");
const Vehicle = require("../../models/persons/vehicles.model"); // Asegúrate de que la ruta sea correcta

// Crear un nuevo vehículo
const createVehicle = async (req, res = response) => {
  try {
    const { vehicleName } = req.body;

    // Verificar si ya existe un vehículo con el mismo nombre
    const existingVehicle = await Vehicle.findOne({ vehicleName });
    if (existingVehicle) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un vehículo con este nombre",
      });
    }

    // Crear una nueva instancia de Vehicle
    const newVehicle = new Vehicle({ vehicleName });

    // Guardar en la base de datos
    const savedVehicle = await newVehicle.save();

    res.status(201).json({
      ok: true,
      msg: "Vehículo creado exitosamente",
      vehicle: savedVehicle,
    });
  } catch (error) {
    console.error("Error al crear vehículo:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener todos los vehículos
const getAllVehicles = async (req, res = response) => {
  try {
    const vehicles = await Vehicle.find();
    res.json({
      ok: true,
      vehicles,
    });
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener un vehículo por ID
const getVehicleById = async (req, res = response) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        ok: false,
        msg: "Vehículo no encontrado",
      });
    }

    res.json({
      ok: true,
      vehicle,
    });
  } catch (error) {
    console.error("Error al obtener vehículo:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Actualizar un vehículo
const updateVehicle = async (req, res = response) => {
  try {
    const vehicleId = req.params.id;
    const { vehicleName } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        ok: false,
        msg: "Vehículo no encontrado",
      });
    }

    // Verificar si el nuevo nombre de vehículo ya existe (excluyendo el vehículo actual)
    if (vehicleName !== vehicle.vehicleName) {
      const existingVehicle = await Vehicle.findOne({
        vehicleName,
        _id: { $ne: vehicleId },
      });
      if (existingVehicle) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe otro vehículo con este nombre",
        });
      }
    }

    vehicle.vehicleName = vehicleName;
    const updatedVehicle = await vehicle.save();

    res.json({
      ok: true,
      msg: "Vehículo actualizado exitosamente",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.error("Error al actualizar vehículo:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Eliminar un vehículo
const deleteVehicle = async (req, res = response) => {
  try {
    const vehicleId = req.params.id;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        ok: false,
        msg: "Vehículo no encontrado",
      });
    }

    await Vehicle.findByIdAndDelete(vehicleId);

    res.json({
      ok: true,
      msg: "Vehículo eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
