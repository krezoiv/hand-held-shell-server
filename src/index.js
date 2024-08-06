const express = require("express");
const path = require("path");
require("dotenv").config();

// Db\D Config
const { dbConnection } = require("./database/config").dbConnection();

// App de Express
const app = express();

// Lectura y parseo del body
app.use(express.json());

// Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

// Path público
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// Rutas
app.use("/api/login", require("./routes/users/auth.routes"));
app.use("/api/user", require("./routes/users/users.routes"));
app.use("/api/message", require("./routes/messages/message.routes"));
app.use(
  "/api/dispenser-reader",
  require("./routes/fuel-station/dispenser.reader.routes")
);

app.use(
  "/api/generalDispenserReader",
  require("./routes/fuel-station/general.dispenser.reader.routes")
);

app.use("/api/sales", require("./routes/sales/sales.control.routes"));
app.use("/api/bankCheck", require("./routes/accounting/bank.check.routes"));
app.use("/api/banks", require("./routes/accounting/banks.routes"));
app.use("/api/bills", require("./routes/accounting/bills.routes"));
app.use("/api/coupons", require("./routes/accounting/coupons.routes"));
app.use("/api/credits", require("./routes/accounting/credits.routes"));
app.use("/api/deposits", require("./routes/accounting/deposits.routes"));
app.use("/api/pos", require("./routes/accounting/pos.routes"));
app.use("/api/tax", require("./routes/accounting/taxes.routes"));
app.use("/api/vales", require("./routes/accounting/vales.routes"));
app.use("/api/vouchers", require("./routes/accounting/vocuhers.routes"));
app.use("/api/clients", require("./routes/persons/clients.routes"));
app.use("/api/stores", require("./routes/persons/stores.routes"));

app.use("/api/fuels", require("./routes/fuel-station/fuels.routes"));
server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log("Servidor corriendo en puerto", process.env.PORT);
});
