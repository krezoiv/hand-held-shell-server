/**
 *
 */
const { Schema, model } = require("mongoose");

const DispenserSchema = Schema(
  {
    dispenserCode: {
      type: String,
      required: true,
    },

    islandId: {
      type: Schema.Types.ObjectId,
      ref: "Island",
      required: true,
    },

    statusId: {
      type: Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },
  },
  { collection: "dispensers" }
);

DispenserSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.dispenserId = _id;
  return object;
});

module.exports = model("Dispenser", DispenserSchema);
