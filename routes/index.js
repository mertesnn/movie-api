const jwt     = require( 'jsonwebtoken' );
const bcrypt  = require( 'bcryptjs' );
const express = require( 'express' );
const router  = express.Router();

// Model
const User    = require( '../models/User' );

router.get( '/', ( req , res , next ) => {
  res.render( 'index', { title : 'Express' } );
});

router.post( '/register' , ( req , res , next) => {
    const { username , password } = req.body;

    bcrypt.hash( password , 10 , ( err , data) => {
        const user = new User( { username , password: data } );

        user.save()
            .then( ( data ) => {
                res.json( data );
            })
            .catch( ( err ) => {
                res.json( err );
            });
    });
});

router.post( '/authenticate' , ( req , res , next ) => {
    const { username , password } = req.body;

    User.findOne( { username } , ( err , data ) => {
        if ( err )
            throw err;

        if ( !data )
            res.json( { status : false , message : 'Authentication failed, user not found.' } );
        else
            bcrypt.compare( password , data.password )
                .then( ( result ) => {
                    if ( !result )
                        res.json( { status : false , message : 'Authentication failed, password is wrong.' } );

                    else {
                        const payload = { username };
                        const token = jwt.sign( payload , req.app.get( 'api_secret_key' ) , { expiresIn: 720 } );
                        res.json( { status: true , token } );
                    }
                });
    });
});

module.exports = router;
