/**
 * modelo de mangueras
 */

const {Schema, model} = require('mongoose');

const HosesSchema = Schema ({
    
    code : {
        type: Number
    },

    hoseColor : {
        type : String,
        required : true
    },

    fuelId : {
        type: Schema.Types.ObjectId,
        ref: 'Fuel',
        required : true
    },
    
    statusId: {
        type:Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },


}, {collection : 'hoses'});

HosesSchema.method( 'toJSON', function() {
    const {__V, _id, ...object} = this.toObject();
    object.hoseId = _id;
    return object;
});

module.exports = model('Hose', HosesSchema);