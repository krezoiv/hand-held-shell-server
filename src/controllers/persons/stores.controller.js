const { response } = require("express");
const Store = require("../../models/persons/store.model"); // Asegúrate de que la ruta sea correcta

// Crear una nueva tienda
const createStore = async (req, res = response) => {
  try {
    const { storeName, storeAdrress, storePhone, storeContact } = req.body;

    // Verificar si ya existe una tienda con el mismo nombre
    const existingStore = await Store.findOne({ storeName });
    if (existingStore) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe una tienda con este nombre",
      });
    }

    // Crear una nueva instancia de Store
    const newStore = new Store({
      storeName,
      storeAdrress,
      storePhone,
      storeContact,
    });

    // Guardar en la base de datos
    const savedStore = await newStore.save();

    res.status(201).json({
      ok: true,
      msg: "Tienda creada exitosamente",
      store: savedStore,
    });
  } catch (error) {
    console.error("Error al crear tienda:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener todas las tiendas
const getAllStores = async (req, res = response) => {
  try {
    const stores = await Store.find();
    res.json({
      ok: true,
      stores,
    });
  } catch (error) {
    console.error("Error al obtener tiendas:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener una tienda por ID
const getStoreById = async (req, res = response) => {
  try {
    const storeId = req.params.id;
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({
        ok: false,
        msg: "Tienda no encontrada",
      });
    }

    res.json({
      ok: true,
      store,
    });
  } catch (error) {
    console.error("Error al obtener tienda:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Actualizar una tienda
const updateStore = async (req, res = response) => {
  try {
    const storeId = req.params.id;
    const { storeName, storeAdrress, storePhone, storeContact } = req.body;

    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({
        ok: false,
        msg: "Tienda no encontrada",
      });
    }

    // Verificar si el nuevo nombre de tienda ya existe (excluyendo la tienda actual)
    if (storeName !== store.storeName) {
      const existingStore = await Store.findOne({
        storeName,
        _id: { $ne: storeId },
      });
      if (existingStore) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe otra tienda con este nombre",
        });
      }
    }

    store.storeName = storeName;
    store.storeAdrress = storeAdrress;
    store.storePhone = storePhone;
    store.storeContact = storeContact;

    const updatedStore = await store.save();

    res.json({
      ok: true,
      msg: "Tienda actualizada exitosamente",
      store: updatedStore,
    });
  } catch (error) {
    console.error("Error al actualizar tienda:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Eliminar una tienda
const deleteStore = async (req, res = response) => {
  try {
    const storeId = req.params.id;

    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({
        ok: false,
        msg: "Tienda no encontrada",
      });
    }

    await Store.findByIdAndDelete(storeId);

    res.json({
      ok: true,
      msg: "Tienda eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar tienda:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
};
