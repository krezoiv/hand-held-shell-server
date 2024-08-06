const { Schema, model } = require("mongoose");

const ValesSchema = Schema(
  {
    valeNumber: {
      type: Number,
      required: true,
    },
    valeDate: {
      type: Date,
      required: true,
    },
    valeAmount: {
      type: Number,
      required: true,
    },
  },
  { collection: "vales" }
);
ValesSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.valeId = _id;
  return object;
});

module.exports = model("Vales", ValesSchema);
