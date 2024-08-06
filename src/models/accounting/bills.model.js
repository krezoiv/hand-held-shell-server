const { Schema, model } = require("mongoose");

const BillsSchema = Schema(
  {
    billNumber: {
      type: String,
      required: true,
    },
    billDate: {
      type: Date,
      required: true,
    },
    billAmount: {
      type: Number,
      required: true,
    },
    billDescription: {
      type: String,
      required: true,
    },
  },
  { collection: "bills" }
);

BillsSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.billId = _id;
  return object;
});

module.exports = model("Bills", BillsSchema);
