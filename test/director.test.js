const chai      = require( 'chai' )
const chaiHttp  = require( 'chai-http' );
const server    = require( '../app' );
const should    = chai.should();
const expect    = chai.expect;

chai.use( chaiHttp );

let token;

describe( '## Director Tests' , () => {
    before( ( done ) => {
        chai.request( server )
            .post( '/authenticate' )
            .send( { username : 'tilkimsi' , password : '12345' } )
            .end( ( err , res ) => {
               token = res.body.token;
               done();
            });
    });

    describe( '# List all directors' , () => {
        it( '( GET /api/directors ) Directors Page' , ( done ) => {
           chai.request( server )
               .get( '/api/directors' )
               .set( 'x-access-token' , token )
               .end( ( err , res ) => {
                  res.should.have.status( 200 );
                  res.body.should.have.be.a( 'array' );
                  done();
               });
        });
    });

    describe( '# Create a new director' , () => {
        it( '( POST /api/directors ) Directors Page' , ( done ) => {
            const newDirector = {
                name    : 'new',
                surname : 'director',
                bio     : 'lorem ipsum dolor'
            };

            chai.request( server )
                .post( '/api/directors' )
                .send( newDirector )
                .set( 'x-access-token' , token )
                .end( ( err , res ) => {
                    res.should.have.status( 200 );
                    res.body.should.have.be.a( 'object' );
                    res.body.should.have.property( 'name' ).eql( newDirector.name );
                    res.body.should.have.property( 'surname' ).eql( newDirector.surname );
                    res.body.should.have.property( 'bio' ).eql( newDirector.bio );
                    done();
                });
        });
    });
});