const mongoose = require( 'mongoose' );

module.exports = () => {
    mongoose.connect( 'mongodb+srv://tilky:ghvyftGrsTy0ayLt@movieapp.g0i93.mongodb.net/movie-app' );
    mongoose.connection.on( 'open', () => {
        console.log( 'MongoDB: Connected.' );
    });
    mongoose.connection.on( 'error', (err) => {
        console.log( 'MongoDB: Error - ', err );
    });

    mongoose.Promise = global.Promise;
};