
 const { Schema, model } = require( 'mongoose');
 
 const StoresSchema = Schema ({
 
    storeName : {
        type : String,
    }
     
 },
 {collection : 'stores'}
 
 );
 
 StoresSchema.method( 'toJSON', function() {
     const { __V, _id, ...object } = this.toObject();
     object.storeId = _id;
     return object;
 });
 
 module.exports = model( 'Store' , StoresSchema );