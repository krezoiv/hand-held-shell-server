/**
 * *When  the order is done, the fuel enters in a 
 * *pending delivery mode.
 * 
 * *Cuando se hace el pedido, el combustible entra en un
 * *modo de entrega pendiente.
 */

 const { Schema, model } = require( 'mongoose' );

const FuelPendingDispatchSchema = Schema({
    
    amountPending : {
        type : String
    },

    fuelId :{
        type : Schema.Types.ObjectId,
        ref: 'Fuels'
    },

    fuelTankId : {
        type : Schema.Types.ObjectId,
        ref: 'FueltTank'
    },

    purchaseOrderId : {
        type: Schema.Types.ObjectId,
        ref: 'PurchaseOrder'
    },

    applied : {
        type : Boolean
    }

},{ collection: 'fuelPendingDispatch'});

FuelPendingDispatchSchema.method('toJSON', function() {
    const {__V, _id, ...object} = this.toObject();
    object.fuelPendingDispatchId = _id;
    return object;
});

module.exports = model('FuelPendingDispatch', FuelPendingDispatchSchema);