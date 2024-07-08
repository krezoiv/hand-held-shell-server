const { Schema, model } = require("mongoose");
const userModel = require("./user.model");

const MessagesSchema = Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },

    to: {
      type: Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { collection: "messages" }
);

MessagesSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.messageId = _id;
  return object;
});

module.exports = model("Message", MessagesSchema);
