const { response } = require("express");
const Client = require("../../models/persons/clients.model"); // Asegúrate de que la ruta sea correcta

// Crear un nuevo cliente
const createClient = async (req, res = response) => {
  try {
    const { clientName, clientEmail, clientPhone, clientAddress } = req.body;

    // Verificar si ya existe un cliente con el mismo email (si se proporciona)
    if (clientEmail) {
      const existingClient = await Client.findOne({ clientEmail });
      if (existingClient) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un cliente con este email",
        });
      }
    }

    // Crear una nueva instancia de Client
    const newClient = new Client({
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
    });

    // Guardar en la base de datos
    const savedClient = await newClient.save();

    res.status(201).json({
      ok: true,
      msg: "Cliente creado exitosamente",
      client: savedClient,
    });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener todos los clientes
const getAllClients = async (req, res = response) => {
  try {
    const clients = await Client.find();
    res.json({
      ok: true,
      clients,
    });
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Obtener un cliente por ID
const getClientById = async (req, res = response) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({
        ok: false,
        msg: "Cliente no encontrado",
      });
    }

    res.json({
      ok: true,
      client,
    });
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Actualizar un cliente
const updateClient = async (req, res = response) => {
  try {
    const clientId = req.params.id;
    const { clientName, clientEmail, clientPhone, clientAddress } = req.body;

    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({
        ok: false,
        msg: "Cliente no encontrado",
      });
    }

    // Verificar si el nuevo email ya existe (excluyendo el cliente actual)
    if (clientEmail && clientEmail !== client.clientEmail) {
      const existingClient = await Client.findOne({
        clientEmail,
        _id: { $ne: clientId },
      });
      if (existingClient) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe otro cliente con este email",
        });
      }
    }

    client.clientName = clientName;
    client.clientEmail = clientEmail;
    client.clientPhone = clientPhone;
    client.clientAddress = clientAddress;

    const updatedClient = await client.save();

    res.json({
      ok: true,
      msg: "Cliente actualizado exitosamente",
      client: updatedClient,
    });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

// Eliminar un cliente
const deleteClient = async (req, res = response) => {
  try {
    const clientId = req.params.id;

    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({
        ok: false,
        msg: "Cliente no encontrado",
      });
    }

    await Client.findByIdAndDelete(clientId);

    res.json({
      ok: true,
      msg: "Cliente eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacte al administrador.",
      error: error.message,
    });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
