/**
 ** Fuel inventory
 */

const { Schema, model } = require("mongoose");

const FuelInventorySchema = Schema(
  {
    inventoryCode: {
      type: String,
    },

    fuelTankId: {
      type: Schema.Types.ObjectId,
      ref: "FuelTank",
    },

    fuelId: {
      type: Schema.Types.ObjectId,
      ref: "Fuel",
    },

    available: {
      type: Number,
    },

    amountPending: {
      type: Number,
    },
  },
  { collection: "fuelInventory" }
);

FuelInventorySchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.fuelInventoryId = _id;
  return object;
});

module.exports = model("FuelInventory", FuelInventorySchema);
