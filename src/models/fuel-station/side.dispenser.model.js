const { Schema, model } = require("mongoose");

const SideDispenserSchema = Schema({
  sideName: {
    type: String,
    required: true,
  },
});

SideDispenserSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.sideId = _id;
  return object;
});

module.exports = model("Side", SideDispenserSchema);
