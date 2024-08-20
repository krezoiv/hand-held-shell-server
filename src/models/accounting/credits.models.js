const { Schema, model } = require("mongoose");

const CreditsSchema = Schema(
  {
    applied: {
      type: Boolean,
    },

    creditNumber: {
      type: Number,
      required: true,
    },
    creditAmount: {
      type: Number,
      required: true,
    },
    creditDate: {
      type: Date,
      required: true,
    },
    regularAmount: {
      type: Number,
      required: true,
    },
    superAmount: {
      type: Number,
      required: true,
    },
    dieselAmount: {
      type: Number,
      required: true,
    },

    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
      required: true,
    },
    salesControlId: {
      type: Schema.Types.ObjectId,
      ref: "SalesControl",
    },
  },
  { collection: "credits" }
);

CreditsSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.creditId = _id;
  return object;
});

module.exports = model("Credits", CreditsSchema);
