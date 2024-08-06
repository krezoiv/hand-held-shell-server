const { Schema, model } = require("mongoose");

const ClientsSchema = Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
    },
    clientPhone: {
      type: String,
    },
    clientAddress: {
      type: String,
    },
  },
  { collection: "clients" }
);

ClientsSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.clientId = _id;
  return object;
});

module.exports = model("Clients", ClientsSchema);
