const { Schema, model } = require("mongoose");

const salesControlSchema = Schema(
  {
    applied: {
      type: Boolean,
    },

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

    billIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bills",
        required: true,
      },
    ],

    valeIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vales",
        required: true,
      },
    ],

    couponsIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Coupons",
        required: true,
      },
    ],

    voucherIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Voucher",
        required: true,
      },
    ],

    depositsIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Deposits",
        required: true,
      },
    ],

    creditIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Credits",
        required: true,
      },
    ],

    bankCheckIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "BankCheck",
        required: true,
      },
    ],
    abonos: {
      type: Number,
    },
    userName: {
      type: String,
    },

    generalDispenserReaderId: {
      type: Schema.Types.ObjectId,
      ref: "GeneralDispenserReader",
    },
  },
  { collection: "salesControl" }
);

salesControlSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.salesControlId = _id;
  return object;
});

module.exports = model("SalesControl", salesControlSchema);
