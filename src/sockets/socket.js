const { io } = require("../index");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  //TODO: client witj jwt
  console.log(client.handshake.headers);

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje", payload);

    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });
});
