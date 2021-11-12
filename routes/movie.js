const express = require( 'express' );
const router  = express.Router();

// Model
const Movie   = require( '../models/Movie' );

// `POST` => Create a new movie.
router.post( '/', ( req , res , next ) => {
  // const { title , imdb_score , category , country , year } = req.body;

  const movie = new Movie( req.body );

  movie.save()
      .then( ( data )  => {
        res.json(  data );
      })
      .catch( ( err ) => {
        res.json( err );
      });
});

// `GET` => List all movies.
router.get( '/' , ( req , res ) => {
    Movie.find( {  } )
        .then( ( data ) => {
            res.json( data );
        })
        .catch( ( err ) => {
            res.json( err );
        });
});

// `GET` => Get the Top10 movies.
router.get( '/top10' , ( req , res , next ) => {
    Movie.find( {  } )
        .sort( { imdb_score : -1 } )
        .limit( 10 )
        .then( ( data ) => {
            if ( !data )
                return next( { errorCode : 1, errorMessage : 'Movie not found.' } );

            res.json( data );
        })
        .catch( ( err ) => {
            res.json( err );
        });
});

// `GET` => Get a movie by ID.
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

// `PUT` => Update a movie by ID.
router.put( '/:movie_id' , ( req , res , next) =>  {
    Movie.findByIdAndUpdate( req.params.movie_id , req.body , { new : true } )
        .then( ( data ) => {
            if ( !data )
                return next( { errorCode : 1, errorMessage : 'Movie not found.' } );

            res.json( data );
        })
        .catch( ( err ) => {
            res.json( err );
        });
});

// `DELETE` => Delete a movie by ID.
router.delete( '/:movie_id' , ( req, res , next ) => {
   Movie.findByIdAndDelete( req.params.movie_id )
       .then( ( data ) => {
           if ( !data )
               return next( { errorCode : 1, errorMessage : 'Movie not found.' } );

           res.json( { status : 1 , message : 'Deleted successfully.' } );
       })
       .catch( ( err ) => {
           res.json( err );
       });
});

// `GET` => Movies between two dates.
router.get( '/between/:start_year/:end_year' , ( req , res , next ) => {
    Movie.find( { year : { $gte : req.params.start_year , $lte : req.params.end_year } } )
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
