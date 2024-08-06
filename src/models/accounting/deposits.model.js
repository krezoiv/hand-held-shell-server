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
  },
  { collection: "dispenserReaders" }
);

DepositsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.depositId = _id;
  return object;
});

module.exports = model("Deposits", DepositsSchema);
