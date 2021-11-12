const mongoose  = require( 'mongoose' );
const Schema    = mongoose.Schema;

const MovieSchema = new Schema({
    director_id     : Schema.Types.ObjectId,
    title           : {
        type        : String,
        required    : [ true , '`{PATH}` field is required.' ],
        maxlength   : [ 20 , '`{PATH}` field must be less than `{MAXLENGTH}` characters.' ],
        minlength   : [ 3 , '`{PATH}` field must be more than `{MINLENGTH}` characters.' ]
    },
    category        : {
        type        : String,
        required    : true,
        maxlength   : 30,
        minlength   : 5
    },
    country         : {
        type        : String,
        required    : true,
        maxlength   : 50,
        minlength   : 3
    },
    year            : {
        type        : Number,
        required    : true,
        max         : 2050,
        min         : 1900
    },
    imdb_score      : Number,
    createdAt       : {
        type        : Date,
        default     : Date.now
    }
});

module.exports = mongoose.model( 'movie' , MovieSchema );