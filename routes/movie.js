const express = require( 'express' );
const router  = express.Router();

// Models
const Movie   = require( '../models/Movie' );

router.post( '/', ( req , res , next ) => {
  // const { title , imdb_score , category , country , year } = req.body;

  const movie = new Movie( req.body );

  movie.save()
      .then( ( data )  => {
        res.json( { status : 1 } );
      })
      .catch( ( err ) => {
        res.json( err );
      });
});

router.get( '/' , ( req , res ) => {
    Movie.find( {  } )
        .then( ( data ) => {
            res.json( data );
        })
        .catch( ( err ) => {
            res.json( err );
        });
});

router.get( '/:movie_id' , ( req , res , next ) => {
    Movie.findById( req.params.movie_id )
        .then( ( data ) => {
            if ( !data )
                return next( { errorCode : 1, errorMessage : 'Movie not found.' } );

            res.json( data );
        })
        .catch( ( err ) => {
            res.json( err );
        });
});

module.exports = router;
