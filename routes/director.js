const mongoose = require( 'mongoose' );
const express  = require( 'express' );
const router   = express.Router();

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
    Director.aggregate([
        {
            $lookup         : {
                from        : 'movies',
                localField  : '_id',
                foreignField: 'director_id',
                as          : 'movies'
            }
        },
        {
            $unwind         : {
                path        : '$movies',
                preserveNullAndEmptyArrays : true
            }
        },
        {
            $group          : {
                _id         : {
                    _id     : '$_id',
                    name    : '$name',
                    surname : '$surname',
                    bio     : '$bio'
                },
                movies          : {
                    $push       : '$movies'
                }
            }
        },
        {
            $project        : {
                _id         : '$_id._id',
                name        : '$_id.name',
                surname     : '$_id.surname',
                movies      : '$movies'
            }
        }
    ]).then( ( data ) => {
        if ( !data )
            return next( { errorCode : 2 , errorMessage : 'Director not found.' } );

        res.json( data );
    }).catch( ( err ) => {
        res.json( err );
    });
});

// `GET` => Get a director.
router.get( '/:director_id' , ( req , res , next ) => {
    Director.aggregate([
        {
            $lookup         : {
                from        : 'movies',
                localField  : '_id',
                foreignField: 'director_id',
                as          : 'movies'
            }
        },
        {
            $unwind         : {
                path        : '$movies',
                preserveNullAndEmptyArrays : true
            }
        },
        {
            $group          : {
                _id         : {
                    _id     : '$_id',
                    name    : '$name',
                    surname : '$surname',
                    bio     : '$bio'
                },
                movies          : {
                    $push       : '$movies'
                }
            }
        },
        {
            $project        : {
                _id         : '$_id._id',
                name        : '$_id.name',
                surname     : '$_id.surname',
                movies      : '$movies'
            }
        },
        {
            $match          : {
                _id         : mongoose.Types.ObjectId( req.params.director_id )
            }
        }
    ]).then( ( data ) => {
        if ( !data )
            return next( { errorCode : 2 , errorMessage : 'Director not found.' } );

        res.json( data );
    }).catch( ( err ) => {
        res.json( err );
    });
});

// `PUT` => Update a director.
router.put( '/:director_id' , ( req , res , next ) => {
   Director.findByIdAndUpdate( req.params.director_id , req.body , { new : true } )
       .then( ( data ) => {
           if ( !data )
               return next( { errorCode : 2 , errorMessage : 'Director not found.' } );

           res.json( data );
       })
       .catch( ( err ) => {
          res.json( err );
       });
});

// `DELETE` => Delete a director.
router.delete( '/:director_id' , ( req , res , next ) => {
    Director.findByIdAndDelete( req.params.director_id )
        .then( ( data ) => {
            if ( !data )
                return next( { errorCode : 2 , errorMessage : 'Director not found.' } );

            res.json( { status : 1 , message : 'Deleted successfully.' } );
        })
        .catch( ( err ) => {
            res.json( err );
        });
});

// `GET` => Director's top 10 movies
router.get( '/:director_id/best10movie' , ( req , res , next ) => {
    Director.aggregate([
        {
            $match          : {
                _id         : mongoose.Types.ObjectId( req.params.director_id )
            }
        },
        {
            $lookup         : {
                from        : 'movies',
                localField  : '_id',
                foreignField: 'director_id',
                as          : 'movies'
            }
        },
        {
            $unwind         : '$movies'
        },
        {
            $sort           : {
                imdb_score  : 1
            }
        },
        {
            $limit          : 10
        },
        {
            $group: {
                _id: {
                    _id: '$_id'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: false,
                movies: '$movies'
            }
        }
    ]).then( ( data ) => {
        if( !data )
            return next( { errorCode : 2 , errorMessage : 'Director not found.' } );

        res.json( data[0].movies );
    }).catch( ( err ) => {
        res.json( err );
    });
});

module.exports = router;