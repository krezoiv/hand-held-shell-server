const { Schema, model } = require("mongoose");

const TaxesSchema = Schema(
  {
    idpName: {
      type: String,
    },

    idpAmount: {
      type: Number,
    },
  },
  { collection: "taxes" }
);

TaxesSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.taxId = _id;
  return object;
});

module.exports = model("Taxes", TaxesSchema);
