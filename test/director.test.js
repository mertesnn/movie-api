const chai      = require( 'chai' )
const chaiHttp  = require( 'chai-http' );
const server    = require( '../app' );
const should    = chai.should();
const expect    = chai.expect;

chai.use( chaiHttp );

let token , directorId;

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
                    directorId = res.body._id;
                    done();
                });
        });
    });

    describe( '# Get a director' , () => {
        it( '( GET /api/directors/:director_id ) Directors Page' , ( done ) => {
            chai.request( server )
                .get( '/api/directors/' + directorId )
                .set( 'x-access-token' , token)
                .end( ( err , res ) => {
                    res.should.have.status( 200 );
                    res.body.should.have.be.a( 'array' );

                    let director = [];

                    res.body.forEach( ( e ) => {
                       director.push( e.name , e.surname );
                    });

                    expect( director ).to.have.members( [ 'new' , 'director' ] );
                    done();
                });
        });
    });

    describe( '# Update a director' , () => {
       it( '( POST /api/directors/:director_id ) Directors Page' , ( done ) => {
           const updateDirector = {
               name     : 'updated name',
               surname  : 'updated surname',
               bio      : 'updated lorem ipsum dolor'
           };

           chai.request( server )
               .put( '/api/directors/' + directorId )
               .send( updateDirector )
               .set( 'x-access-token' , token )
               .end( ( err , res ) => {
                   res.should.have.status( 200 );
                   res.body.should.have.be.a( 'object' );
                   res.body.should.have.property( '_id' ).eql( directorId );
                   res.body.should.have.property( 'name' ).eql( updateDirector.name );
                   res.body.should.have.property( 'surname' ).eql( updateDirector.surname );
                   res.body.should.have.property( 'bio' ).eql( updateDirector.bio );
                   done();
               });
       });
    });

    describe( '# Delete a director' , () => {
        it( '( POST /api/directors/:movie_id ) Directors Page' , ( done ) => {
            chai.request( server )
                .delete( '/api/directors/' + directorId )
                .set( 'x-access-token' , token )
                .end( ( err , res ) => {
                    res.should.have.status( 200 );
                    res.body.should.have.be.a( 'object' );
                    res.body.should.have.property( 'status' ).eql( 1 );
                    res.body.should.have.property( 'message' ).eql( 'Deleted successfully.' );
                    done();
                });
        });
    });
});