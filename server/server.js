require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./db');
const passport = require('./passport');

const app = express();
const PORT = process.env.PORT || 3001;

app.use( morgan('dev') );
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );

app.use(
    session({
        secret: process.env.APP_SECRET,
        store: new MongoStore({
            mongooseConnection: dbConnection
        }),
        resave: false,
        saveUnititialized: false
    })
);

app.use( passport.initialize() );
app.use( passport.session() );

if( process.env.NODE_ENV === 'production' ) {
	const path = require('path');

	app.use('/static', express.static(path.join(__dirname, '../build/static')));
	app.get('/', (req, res) => {
		res.sendFile( path.join(__dirname, '../build/') );
	});
}

app.use( '/auth', require('./auth') );
app.use( '/api', require('./api') );

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
      message: err.message
  });
});

app.listen( PORT, () => {
    console.log( `App listening of PORT: ${PORT}` );
});