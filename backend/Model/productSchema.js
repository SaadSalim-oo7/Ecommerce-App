const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    Title : {
        type : String,
        required :  true
    },
    Description : {
        type : String,
        required : true
    },
    Rating : {
        type : Number,
        required : true
    },
    Price : {
        type : String,
        required : true
    },
    Thumbnail : {
        data : Buffer,
        contentType : String
    }
})

module.exports = mongoose.model('product', productSchema)