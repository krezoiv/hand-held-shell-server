/**
 * modelo que contiene el tipo de combustible para el dispensador
 * un dispensador podra tener varios tipo de combustible
 */

const { Schema, model } = require("mongoose");

const DispenserFuelSchema = Schema(
  {
    dispenserId: {
      type: Schema.Types.ObjectId,
      ref: "Dispenser",
      required: true,
    },

    statusId: {
      type: Schema.Types.ObjectId,
      ref: "status",
      required: true,
    },
  },
  { collection: "dispenserFuel" }
);

DispenserFuelSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.dispenserFuelId = _id;
  return object;
});

module.exports = model("DispenserFuel", DispenserFuelSchema);
