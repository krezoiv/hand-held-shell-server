/**
 * coleccion para el detalle de las ordenes
 */
 const { Schema, model } = require( 'mongoose' );

const DetailPurchaseOrderSchema = Schema({

    amount : {
        type : Number,       
    },

    price : {
        type : Number,
       
    },

    fuelId : {
        type : Schema.Types.ObjectId,
        ref : 'Fuel',
       
    },

    purchaseOrderId : {
        type : Schema.Types.ObjectId,
        ref : 'PurchaseOrder',  
    },

    idpTotal : {
        type: Number
    },

    total: {
        type : Number
    },

    aplicado: {
        type : Boolean
    }

    

}, { collection : 'detailPurchaseOrder' } );

DetailPurchaseOrderSchema.method( 'toJSON', function() {
    const { __V,_id, ...object } = this.toObject();
    object.detailPurchaseOrderId = _id;
    return object;
});

module.exports = model ( 'DetailPurchaseOrder', DetailPurchaseOrderSchema );