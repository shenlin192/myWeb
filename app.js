const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const yes = require('yes-https');

//
const db = require('./models/db');

// authentication
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
// const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const expressValidator = require('express-validator');

// routers
const index = require('./routes/index');
const account = require('./routes/account');
const react = require('./routes/react');
const api = require('./routes/api');

// database
// var db = require('./models/db');

// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const config = require('./webpack.config.js');
// const compiler = webpack(config);

const app = express();

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// app.use(webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath
// }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('client/dist'));


const sess = {
  // secret: crypto.randomBytes(10).toString(),
  secret: process.env.SESSION_SECRECT,
  resave: true, // don't renew the session cookies
  saveUninitialized: false, // don't send cookies unless logged in
  // using store session on MongoDB using express-session + connect
  store: new MongoStore({ mongooseConnection: db.connection }),
  cookie: { httpOnly: false },
};

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true);// trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

// force secure connect
if (process.env.NODE_ENV == 'production') {
  function requireHTTPS(req, res, next) {
    const schema = req.headers['x-forwarded-proto'];
    if (schema !== 'https') {
      return res.redirect(`https://${req.get('host')}${req.url}`);
    }
    next();
  }
  app.use(requireHTTPS);
}

// router
app.use('/', index);
app.use('/account', account);
app.use('/react', react);
app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // console.error("server error", err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
