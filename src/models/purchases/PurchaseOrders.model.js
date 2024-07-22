
/**
 * 
 */
const { Schema, model } = require( 'mongoose' );


const PurchaseOrdersSchema = Schema({

    orderNumber : {
        type : String,
        
    },

    orderDate : {
        type : Date,
        require : true
    },

    deliveryDate : {
        type : Date,
        
    },

    totalPurchaseOrder : {
        type : Number,
        
    },

    totalIDPPurchaseOrder : {
        type : Number,
        
    },
    
    storeId : {
        type : Schema.Types.ObjectId,
        ref : 'Store',
        
    },

    vehicleId : {
        type : Schema.Types.ObjectId,
        ref : 'Vehicle',
        
    },


    applied : {
        type : Boolean
    },

    turn : {
        type : String
    },

    totalGallonRegular : {
        type : Number
    },

    totalGallonSuper :{
        type : Number
    },

    totalGallonDiesel : {
        type : Number
    },

    purchaseId : {
        type : Schema.Types.ObjectId,
        ref : 'Purchase',
        
    },
    userName : {
        type: String
    }



}, { collection : 'purchaseOrder' } );


 
PurchaseOrdersSchema.method( 'toJSON', function() {

    const { __V, _id, ...object } = this.toObject();
    object.purchaseOrderId = _id;
    return object;
});

module.exports = model( 'PurchaseOrder', PurchaseOrdersSchema );
