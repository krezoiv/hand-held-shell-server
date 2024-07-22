/**
 * modelo que tendra el total de los galones
 * que vienen del dispenser reader, esto servira
 * para asignarselo al resumen de ventas
 */

const { Schema, model } = require("mongoose");

const GeneralDispenserReadeSchema = Schema(
  {
    applied: {
      type: Boolean,
    },

    totalGallonRegular: {
      type: Number,
    },

    totalMechanicRegular: {
      type: Number,
    },

    totalMoneyRegular: {
      type: Number,
    },

    totalGallonSuper: {
      type: Number,
    },

    totalMechanicSuper: {
      type: Number,
    },

    totalMoneySuper: {
      type: Number,
    },

    totalGallonDiesel: {
      type: Number,
    },

    totalMechanicDiesel: {
      type: Number,
    },

    totalMoneyDiesel: {
      type: Number,
    },

    totalGallonVpower: {
      type: Number,
    },

    totalMechanicVpower: {
      type: Number,
    },

    totalMoneyVpower: {
      type: Number,
    },

    readingDate: {
      type: Date,
      required: true,
    },
  },
  { collection: "generalDispenserReader" }
);

GeneralDispenserReadeSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.generalDispenserReaderId = _id;
  return object;
});

module.exports = model("GeneralDispenserReader", GeneralDispenserReadeSchema);
