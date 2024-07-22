/**
 * modelo para asignar margen de galones
 * que serivra para las proyecciones
 */

const { Schema, model } = require("mongoose");

const GallonsMarginSchema = Schema(
  {},

  { collection: "gallonsMargin" }
);
GallonsMarginSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.gallonsMarginId = _id;
  return object;
});

module.exports = model("GallonsMargin", GallonsMarginSchema);
