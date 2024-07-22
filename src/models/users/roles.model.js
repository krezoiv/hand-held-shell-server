/**
 *
 */
const { Schema, model } = require("mongoose");

const RolesSchema = Schema({
  roleName: {
    type: String,
    required: true,
  },
});

RolesSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.rolesId = _id;
  return object;
});

module.exports = model("Roles", RolesSchema);
