/**
 * coleccion para compras
 */
   
  
 const { Schema, model } = require( 'mongoose' );

 const PurchasesSchema = Schema ({
 
     deliveryDate : {
         type : Date,     
     },

     expirationDate : {
        type: Date
     },
 
     totalPurchase : {
         type : Number,     
     },
 
     invoiceSerie : {
         type : String,     
     },
 
     invoiceDocument : {
         type : String,     
     },
 
     purchaseOrderId : {
         type : Schema.Types.ObjectId,
         ref : 'PurchaseOrder',
     },
  
     appliedId : {
         type: String
     },
 
     formaPago : {
         type : Schema.Types.ObjectId,
         ref : 'PaymentMethod',
     },
     
     otherPayment : {
        type : Number
     },

     otherPaymentDescription : {
        type : String
     },

     bankId: {
        type: String
     },

     NoBankCheck : {
        type : String
     },

     checkAmount : {
        type : Number
     },

    couponsAmount : {
        type : Number
    },
    
    orderNumber: {
        type: String
    },
    userName : {
        type: String
    }


 
 
 }, { collection : 'purchases' } );
 
 PurchasesSchema.method( 'toJSON', function() {
     const { __V, _id, ...object } = this.toObject();
     object.purchaseId = _id;
     return object; 
 });
 
 module.exports = model( 'Purchase', PurchasesSchema );