const {
  connectedUser,
  disconnectedUser,
} = require("../controllers/sockets/socket.controller");
const { validateJWT } = require("../helpers/jwt.helpers");
const { io } = require("../index");

// Mensajes de Sockets
io.on("connection", (client) => {
  const [valido, userId] = validateJWT(client.handshake.headers["x-token"]);

  // Verificar autenticación
  if (!valido) {
    return client.disconnect();
  }

  // Cliente autenticado
  connectedUser(userId);

  client.on("disconnect", () => {
    disconnectedUser(userId);
  });
});
