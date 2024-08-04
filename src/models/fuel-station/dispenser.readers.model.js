const { Schema, model } = require("mongoose");

const DispenserReaderSchema = Schema(
  {
    previousNoGallons: {
      type: Number,
      required: true,
    },
    actualNoGallons: {
      type: Number,
      required: true,
    },
    totalNoGallons: {
      type: Number,
      required: true,
    },
    previousNoMechanic: {
      type: Number,
      required: true,
    },
    actualNoMechanic: {
      type: Number,
      required: true,
    },
    totalNoMechanic: {
      type: Number,
      required: true,
    },
    previousNoMoney: {
      type: Number,
      required: true,
    },
    actualNoMoney: {
      type: Number,
      required: true,
    },
    totalNoMoney: {
      type: Number,
      required: true,
    },
    assignmentHoseId: {
      type: Schema.Types.ObjectId,
      ref: "AssignmentHose",
      required: true,
    },
    generalDispenserReaderId: {
      type: Schema.Types.ObjectId,
      ref: "GeneralDispenserReader",
      required: true,
    },
  },
  { collection: "dispenserReaders" }
);

DispenserReaderSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.dispenserReaderId = _id;
  return object;
});

module.exports = model("DispenserReader", DispenserReaderSchema);
