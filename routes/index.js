const express = require( 'express' );
const router  = express.Router();

// Model
const User    = require( '../models/User' );

router.get( '/', ( req , res , next ) => {
  res.render( 'index', { title : 'Express' } );
});

router.post( '/register' , ( req , res , next) => {
  const user = new User( req.body );

  user.save()
      .then( ( data ) => {
        res.json( data );
      })
      .catch( ( err ) => {
        res.json( err );
      });
});

module.exports = router;
