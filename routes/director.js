const express = require( 'express' );
const router  = express.Router();

// Model
const Director = require( '../models/Director' );

// `POST` => Create a new director.
router.post( '/' , ( req , res , next ) => {
    const director = new Director( req.body );

    director.save()
        .then( ( data ) => {
            res.json( data );
        })
        .catch( ( err ) => {
            res.json( err );
        });
});

module.exports = router;