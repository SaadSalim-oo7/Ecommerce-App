const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Age : {
        type : Number,
        required : true
    },
    City : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        required : true
    }
})

module.exports = mongoose.model('user', userSchema )