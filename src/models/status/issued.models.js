/**
 * emitido o no emitido
 */

const { Schema, model} = require( 'mongoose' );

const IssuedSchema = Schema({
    
    issuedName :{
        type : String,
        required : true
    }
});


IssuedSchema.method( 'toJSON', function() {

    const {__V, _id, ...object } = this.toObject();
    object.issuedId = _id; 
    return object;

});


module.exports = model('Issued', IssuedSchema);