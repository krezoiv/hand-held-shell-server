
const {Schema, model} = require('mongoose');

const salesControlSchema = Schema({

    salesDate : {
        type : Date,
       
    },

    noDocument : {
        type: Number
    },

    regularPrice : {
        type: Number
    },

    superPrice : {
        type : Number
    },

    dieselPrice : {
        type: Number
    },

    totalGallonRegular : {
        type : Number
    },

    totalGallonSuper : {
        type : Number
    },

    totalGallonDiesel  : {
        type : Number
    },

    regularAccumulatedGallons : {
        type : Number
    },

   
    superAccumulatedGallons : {
        type : Number
    },

    dieselAccumulatedGallons : {
        type : Number
    },

    total : {
        type: Number
    },
    
    balance: {
        type : Number
    },

    totalAbonosBalance : {
        type : Number
    },

    bills : {
        type : Number
    },

    vales : {
        type : Number
    },

    cupones : {
        type : Number
    },

    vouchers : {
        type : Number
    },

    deposits : {
        type : Number
    },

    depositSlip : {
        type : Number
    },

    credits : {
        type : Number
    },

    abonos : {
        type : Number
    },

    generalDispenserReaderId : {
        type : Schema.Types.ObjectId,
        ref : 'GeneralDispenserReader',
        
    },
    userName : {
        type: String
    }


}, {collection : 'salesControl'});

salesControlSchema.method('toJSON', function(){
    const {__V, _id, ...object} = this.toObject();
    object.salesControlId = _id;
    return object;
});

module.exports = model('SalesContro', salesControlSchema);