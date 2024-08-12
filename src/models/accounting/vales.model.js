const { Schema, model } = require("mongoose");

const ValesSchema = Schema(
  {
    valeNumber: {
      type: String,
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
    valeDescription: {
      type: String,
      required: true,
    },
    salesControlId: {
      type: Schema.Types.ObjectId,
      ref: "SalesControl",
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
