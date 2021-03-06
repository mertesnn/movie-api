const createError   = require( 'http-errors' );
const express       = require( 'express' );
const path          = require( 'path' );
const cookieParser  = require( 'cookie-parser' );
const logger        = require( 'morgan' );

const indexRouter     = require( './routes/index' );
const movieRouter     = require( './routes/movie' );
const directorRouter  = require( './routes/director' );

const app = express();

// DB Connection
const db = require( './helper/config' )();

// Middleware
const verifyToken = require( './middleware/verify-token' );

// Config
const config = require( './config' );
app.set( 'api_secret_key', config.api_secret_key );

// Template Engine
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'pug' );

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser());
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Routes
app.use( '/', indexRouter );
app.use( '/api', verifyToken );
app.use( '/api/movies', movieRouter );
app.use( '/api/directors', directorRouter );

// Catch 404
app.use( ( req , res , next ) => {
  next( createError( 404 ) );
});

// Error Handler
app.use( ( err , req , res , next ) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

  res.status(err.status || 500);
  res.json( { error : { error_code : err.errorCode , error_message : err.errorMessage } } );
});

module.exports = app;
