const {
  connectedUser,
  disconnectedUser,
  saveMessage,
} = require("../controllers/sockets/socket.controller");
const { validatingJWT } = require("../helpers/jwt.helpers");
const { io } = require("../index");

// Mensajes de Sockets
io.on("connection", (client) => {
  const [valido, userId] = validatingJWT(client.handshake.headers["x-token"]);

  // Verificar autenticación
  if (!valido) {
    return client.disconnect();
  }

  // Cliente autenticado
  connectedUser(userId);

  //
  client.join(userId);
  client.on("message-one-to-one", async (payload) => {
    console.log(payload);

    await saveMessage(payload);
    io.to(payload.to).emit("message-one-to-one", payload);
  });

  client.on("disconnect", () => {
    disconnectedUser(userId);
  });
});
