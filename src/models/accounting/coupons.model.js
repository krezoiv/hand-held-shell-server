const { Schema, model } = require("mongoose");

const CouponsSchema = Schema(
  {
    applied: {
      type: Boolean,
    },
    cuponesNumber: {
      type: String,
      required: true,
    },
    cuponesDate: {
      type: Date,
      required: true,
    },
    cuponesAmount: {
      type: Number,
      required: true,
    },
    salesControlId: {
      type: Schema.Types.ObjectId,
      ref: "SalesControl",
    },
  },

  { collection: "coupons" }
);

CouponsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.couponId = _id;
  return object;
});

module.exports = model("Coupons", CouponsSchema);
