const createError   = require( 'http-errors' );
const express       = require( 'express' );
const path          = require( 'path' );
const cookieParser  = require( 'cookie-parser' );
const logger        = require( 'morgan' );

const indexRouter   = require( './routes/index' );
const usersRouter   = require( './routes/users' );

const app = express();

// DB Connection
const db = require( './helper/config' )();

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
app.use( '/users', usersRouter );

// Catch 404
app.use( ( req , res , next ) => {
  next( createError( 404 ) );
});

// Error Handler
app.use( ( err , req , res , next ) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

  res.status(err.status || 500);
  res.render( 'error' );
});

module.exports = app;
