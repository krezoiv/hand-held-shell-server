/**
 * Coleccion para la Isla 
 */ 

const { Schema, model} = require ( 'mongoose');

const IslandSchema = Schema ({

    islandNumber : {
        type : String,
        required : true
    },

    statusId: {
        type:Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },

},
{ collection : 'islands'}
);

IslandSchema.method( 'toJSON', function() {
    const {__V, _id, ...object } = this.toObject();
    object.islandId = _id;
    return object;
});

module.exports = model( 'Island', IslandSchema );