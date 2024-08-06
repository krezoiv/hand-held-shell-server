const { Schema, model } = require("mongoose");

const POSSchema = Schema(
  {
    posName: {
      type: String,
      required: true,
    },
  },
  { collection: "pos" }
);

POSSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.posId = _id;
  return object;
});

module.exports = model("POS", POSSchema);
