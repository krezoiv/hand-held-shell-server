const { Schema, model } = require("mongoose");

const BanksSchema = Schema({
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
});

BanksSchema.method(
  "toJSON",
  function () {
    const { __V, _id, ...object } = this.toObject();
    object.bankId = _id;
    return object;
  },
  { collection: "banks" }
);

module.exports = model("Banks", BanksSchema);
