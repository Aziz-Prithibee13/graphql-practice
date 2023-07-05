const mongoose = require('mongoose');

const Schema = mongoose.Schema



const productSchema = new Schema({
    
    _id :
    {  
        type : String,
        required : true
    },
    name : 
    {
        type : String,
        required : true
    },
    family : 
    {
        type : String,
     
        required : true
    },

    scientificName : 
    {
        type : String,
        required : true
    }

})


module.exports = mongoose.model('products' , productSchema)