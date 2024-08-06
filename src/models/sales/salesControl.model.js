const { Schema, model } = require("mongoose");

const salesControlSchema = Schema(
  {
    salesDate: {
      type: Date,
    },

    noDocument: {
      type: Number,
    },

    regularPrice: {
      type: Number,
    },

    superPrice: {
      type: Number,
    },

    dieselPrice: {
      type: Number,
    },

    totalGallonRegular: {
      type: Number,
    },

    totalGallonSuper: {
      type: Number,
    },

    totalGallonDiesel: {
      type: Number,
    },

    regularAccumulatedGallons: {
      type: Number,
    },

    superAccumulatedGallons: {
      type: Number,
    },

    dieselAccumulatedGallons: {
      type: Number,
    },

    total: {
      type: Number,
    },

    balance: {
      type: Number,
    },

    totalAbonosBalance: {
      type: Number,
    },

    billId: {
      type: Schema.Types.ObjectId,
      ref: "Bills",
      required: true,
    },

    valeId: {
      type: Schema.Types.ObjectId,
      ref: "Vales",
      required: true,
    },

    couponsId: {
      type: Schema.Types.ObjectId,
      ref: "Coupons",
      required: true,
    },

    voucherId: {
      type: Schema.Types.ObjectId,
      ref: "Voucher",
      required: true,
    },

    depositsId: {
      type: Schema.Types.ObjectId,
      ref: "Deposits",
      required: true,
    },

    creditId: {
      type: Schema.Types.ObjectId,
      ref: "Credits",
      required: true,
    },

    abonos: {
      type: Number,
    },

    bankCheckId: {
      type: Schema.Types.ObjectId,
      ref: "BankCheck",
      required: true,
    },

    generalDispenserReaderId: {
      type: Schema.Types.ObjectId,
      ref: "GeneralDispenserReader",
    },
    userName: {
      type: String,
    },
  },
  { collection: "salesControl" }
);

salesControlSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.salesControlId = _id;
  return object;
});

module.exports = model("SalesContro", salesControlSchema);
