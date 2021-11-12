const mongoose  = require( 'mongoose' );
const Schema    = mongoose.Schema;

const UserSchema = new Schema({
    username            : {
        type            : String,
        required        : true,
        unique          : true,
        maxlength       : 25,
        minlength       : 6
    },
    password            : {
        type            : String,
        minlength       : 5
    }
});

module.exports = mongoose.model( 'user' , UserSchema );