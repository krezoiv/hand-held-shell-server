const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,

      unique: true,
    },

    password: {
      type: String,
    },

    roleId: {
      type: String,
    },

    statusId: {
      type: Schema.Types.ObjectId,
      ref: "Status",
    },
    online: {
      type: Boolean,
      default: false,
    },

    workShift: {
      type: Number,
    },
  },
  { collection: "users" }
);

UserSchema.method("toJSON", function () {
  const { __V, _id, password, ...object } = this.toObject();
  object.userId = _id;
  return object;
});

module.exports = model("User", UserSchema);
