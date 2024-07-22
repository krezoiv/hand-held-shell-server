/**
 * modelo para detalle para asignacion de
 * lado y manguera
 */

const { Schema, model } = require("mongoose");

const AssignmentHoseSchema = Schema(
  {
    position: {
      type: Number,
    },

    hoseId: {
      type: Schema.Types.ObjectId,
      ref: "Hose",
    },

    sideId: {
      type: Schema.Types.ObjectId,
      ref: "Side",
    },

    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
    },

    statusId: {
      type: Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },
  },
  { collection: "assignmentHose" }
);

AssignmentHoseSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.assignmentHoseId = _id;
  return object;
});

module.exports = model("AssignmentHose", AssignmentHoseSchema);
