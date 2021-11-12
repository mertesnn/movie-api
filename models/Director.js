const mongoose  = require( 'mongoose' );
const Schema    = mongoose.Schema;

const DirectorSchema = new Schema({
    name            : {
        type        : String,
        required    : true,
        maxlength   : 50,
        minlength   : 2
    },
    surname         : {
        type        : String,
        required    : true,
        maxlength   : 50,
        minlength   : 2
    },
    bio             : {
        type        : String,
        required    : true,
        maxlength   : 150,
        minlength   : 2
    },
    createdAt       : {
        type        : Date,
        default     : Date.now
    }
});

module.exports = mongoose.model( 'director' , DirectorSchema );