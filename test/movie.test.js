const chai      = require( 'chai' );
const chaiHttp  = require( 'chai-http' );
const server    = require( '../app' );
const should    = chai.should();

chai.use( chaiHttp );

let token;

describe( '## Movies tests' , () => {
    before( ( done ) => {
        chai.request( server )
            .post( '/authenticate' )
            .send( { username : 'tilkimsi' , password : '12345' } )
            .end( ( err , res ) => {
                token = res.body.token;
                done();
            });
    });

    describe( '# List all movies.' , () => {
        it( '( GET /api/movies ) Movies Page' , ( done ) => {
            chai.request( server )
                .get( '/api/movies' )
                .set( 'x-access-token' , token)
                .end( ( err , res ) => {
                    res.should.have.status( 200 );
                    res.body.should.have.a( 'array' );
                    done();
                });

        });
    });
});