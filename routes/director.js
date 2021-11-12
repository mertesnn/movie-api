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

// `GET` => List all directors.
router.get( '/' , ( req , res , next ) => {
    Director.find( {  } )
        .then( ( data ) => {
            if ( !data )
                return next( { error_code: 2 , error_message: 'Director not found.' } );

            res.json( data );
        })
        .catch( ( err ) => {
            res.json( err );
        });
});

// `GET` => Get a director.
router.get( '/:director_id' , ( req , res , next ) => {
    Director.findById( req.params.director_id )
        .then( ( data ) => {
            if ( !data )
                return next( { error_code: 2 , error_message: 'Director not found.' } );

            res.json( data );
        })
        .catch( ( err ) => {
            res.json( err );
        });
});

module.exports = router;