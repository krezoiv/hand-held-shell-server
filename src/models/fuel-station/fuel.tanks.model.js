/**
 * Coleccion para tanque de almacen de combustible
 */

const { Schema, model } = require('mongoose');

const FuelTankSchema = Schema({

  
    tankName: {
        type: String,
        require: true
    },

    maxStorage: {
        type: Number,
        required: true
    },

    fuelId: {
        type: Schema.Types.ObjectId,
        ref: 'Fuel',
        required: true
    },

    statusId: {
        type: Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    }


},
    { collection: 'fuelTank' }
);

FuelTankSchema.method('toJSON', function () {
    const { __V, _id, ...object } = this.toObject();
    object.fuelTankId = _id;
    return object;
});

module.exports = model('FuelTank', FuelTankSchema)