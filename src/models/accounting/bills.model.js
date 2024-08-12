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
    salesControlId: {
      type: Schema.Types.ObjectId,
      ref: "SalesControl",
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
