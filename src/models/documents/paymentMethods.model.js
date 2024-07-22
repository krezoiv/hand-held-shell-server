/**
 * coleccion para los metodos de pago al contado o credito
 */

const { Schema, model } = require("mongoose");

const PaymentMehtodsSchema = Schema(
  {
    method: {
      type: String,
    },
  },
  { collection: "paymentMethods" }
);

PaymentMehtodsSchema.method("toJSON", function () {
  const { __V, _id, ...object } = this.toObject();
  object.paymentMethodId = _id;
  return object;
});

module.exports = model("PaymentMethod", PaymentMehtodsSchema);
