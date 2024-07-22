/**
 * 
 */
const { Schema, model } = require( 'mongoose' );

const StatusSchema = Schema ({
    
    statusName: {
        type: String,
        required: true
    }
});

StatusSchema.method( 'toJSON', function() {

    const {__V, _id, ...object } = this.toObject();
    object.statusId = _id;
   
    return object;

});


module.exports = model('Status', StatusSchema);