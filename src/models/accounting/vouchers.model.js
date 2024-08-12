const { Schema, model } = require("mongoose");

const VoucherSchema = Schema(
  {
    applied: {
      type: Boolean,
    },

    authorizationCode: {
      type: String,
      required: true,
    },

    posId: {
      type: Schema.Types.ObjectId,
      ref: "POS",
      required: true,
    },
    voucherAmount: {
      type: Number,
      required: true,
    },

    voucherDate: {
      type: Date,
      required: true,
    },
    salesControlId: {
      type: Schema.Types.ObjectId,
      ref: "SalesControl",
    },
  },
  { collection: "voucher" }
);

VoucherSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.voucherId = _id;
  return object;
});

module.exports = model("Voucher", VoucherSchema);
