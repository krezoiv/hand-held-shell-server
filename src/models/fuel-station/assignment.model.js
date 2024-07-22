/**
 * modelo asignacion de mangueras a la bombda
 */

const { Schema, model } = require("mongoose");

const AssignmentSchema = Schema(
  {
    dispenserId: {
      type: Schema.Types.ObjectId,
      ref: "Dispenser",
      required: true,
    },
  },
  { collection: "assignments" }
);

AssignmentSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.assignmentId = _id;
  return object;
});

module.exports = model("Assignment", AssignmentSchema);
