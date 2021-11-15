const chai      = require( 'chai' );
const chaiHttp  = require( 'chai-http' );
const server    = require( '../app' );
const should    = chai.should();

chai.use( chaiHttp );

let token , movieId;

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

    describe( '# Create a new movie.' , () => {
        it( '( POST /api/movies ) Movies Page' , ( done ) => {
            chai.request( server )
                .post( '/api/movies' )
                .send({
                    director_id :'618e4b008331a317a2a69b89' ,
                    title       : 'Yepis yeni film',
                    category    : 'doğaüstü',
                    country     : 'Afrika',
                    year        : 2021,
                    imdb_score  : 10
                })
                .set( 'x-access-token' , token )
                .end( ( err , res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'director_id' );
                    res.body.should.have.property( 'title' );
                    res.body.should.have.property( 'category' );
                    res.body.should.have.property( 'country' );
                    res.body.should.have.property( 'year' );
                    res.body.should.have.property( 'imdb_score' );
                    movieId = res.body._id;
                    done();
                });
        });
    });

    describe( '# Update a movie.' , () => {
        it( '( PUT /api/movies/:movie_id ) Movies Page' , ( done ) => {
           chai.request( server )
               .put( '/api/movies/' + movieId )
               .send({
                   director_id :'618e4b008331a317a2a69b89' ,
                   title       : 'güncellenmiş film',
                   category    : 'doğaüstü',
                   country     : 'türkiye',
                   year        : 2001,
                   imdb_score  : 4
               })
               .set( 'x-access-token' , token )
               .end( ( err , res ) => {
                   res.should.have.status( 200 );
                   res.body.should.be.a( 'object' );
                   res.body.should.have.property( 'director_id' );
                   res.body.should.have.property( 'title' );
                   res.body.should.have.property( 'category' );
                   res.body.should.have.property( 'country' );
                   res.body.should.have.property( 'year' );
                   res.body.should.have.property( 'imdb_score' );
                   res.body.should.have.property( '_id' ).eql( movieId );
                   done();
               });
        });
    });
});