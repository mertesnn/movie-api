const chai      = require( 'chai' );
const chaiHttp  = require( 'chai-http' );
const server    = require( '../app' );
const should    = chai.should();

chai.use( chaiHttp );

describe( '## Page tests' , () => {
    it( '( GET / ) Index Page' , ( done ) => {
        chai.request( server )
            .get( '/' )
            .end( ( err , res ) => {
                res.should.have.status( 200 );
                done();
            })
    });
});