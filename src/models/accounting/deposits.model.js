const { Schema, model } = require("mongoose");

const DepositsSchema = Schema(
  {
    depositNumber: {
      type: Number,
      required: true,
    },
    depositAmount: {
      type: Number,
      required: true,
    },
    depositDate: {
      type: Date,
      required: true,
    },
    bankId: {
      type: Schema.Types.ObjectId,
      ref: "Banks",
      required: true,
    },
    salesControlId: {
      type: Schema.Types.ObjectId,
      ref: "SalesControl",
    },
  },
  { collection: "deposits" }
);

DepositsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.depositId = _id;
  return object;
});

module.exports = model("Deposits", DepositsSchema);
