/**
 *
 */
const { Schema, model } = require("mongoose");

const FuelSchema = Schema(
  {
    fuelName: {
      type: String,
      required: true,
    },

    costPrice: {
      type: Number,
      required: true,
    },

    salePrice: {
      type: Number,
      required: true,
    },

    statusId: {
      type: Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },

    taxesId: {
      type: Schema.Types.ObjectId,
      ref: "Taxes",
      required: true,
    },
  },
  { collection: "fuels" }
);

FuelSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.fuelId = _id;
  return object;
});

module.exports = model("Fuel", FuelSchema);
