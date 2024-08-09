const { Schema, model, Collection } = require("mongoose");

const BankCheckSchema = Schema(
  {
    checkNumber: {
      type: Number,
      require: true,
    },
    checkValue: {
      type: Number,
      require: true,
    },
    checkDate: {
      type: Date,
      required: true,
    },
    bankId: {
      type: Schema.Types.ObjectId,
      ref: "Banks",
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
    },
    applied: {
      type: Boolean,
    },
  },
  { collection: "bankCheck" }
);

BankCheckSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.bankCheckId = _id;
  return object;
});

module.exports = model("BankCheck", BankCheckSchema);
