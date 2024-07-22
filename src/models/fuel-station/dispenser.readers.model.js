/**
 * coleccion que se encargara de la toma de lectura de
 * numeracion de cada dispensador
 */

const { Schema, model } = require("mongoose");

const dispenserReaderSchema = Schema(
  {
    //numeracion anterior
    previousNoGallons: {
      type: Number,
    },
    //numeracion actual
    actualNoGallons: {
      type: Number,
    },

    //total de galones
    totalNoGallons: {
      type: Number,
    },

    previousNoMechanic: {
      type: Number,
    },

    actualNoMechanic: {
      type: Number,
    },

    totalNoMechanic: {
      type: Number,
    },

    previousNoMoney: {
      type: Number,
    },

    actualNoMoney: {
      type: Number,
    },

    totalNoMoney: {
      type: Number,
    },

    assignmentHoseId: {
      type: Schema.Types.ObjectId,
      ref: "AssignmentHose",
    },

    generalDispenserReaderId: {
      type: Schema.Types.ObjectId,
      ref: "GeneralDispenserReader",
    },
  },
  { collection: "dispenserReaders" }
);
dispenserReaderSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.dispenserReaderId = _id;
  return object;
});

module.exports = model("DispenserReader", dispenserReaderSchema);
