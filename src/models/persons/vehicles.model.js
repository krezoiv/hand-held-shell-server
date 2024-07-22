/**
 * coleccion para los vehiculos
 */  

const { Schema, model } = require( 'mongoose' );

const VehiclesSchema = Schema({

    vehicleName : {
        type : String,
    },

    driver : {
        type : String,
    }


}, { collection : 'vehicle' } );

VehiclesSchema.method( 'toJSON', function(){
    const { __V, _id, ...object } = this.toObject();
    object.vehicleId = _id;
    return object;
});

module.exports = model( 'Vehicle', VehiclesSchema );
