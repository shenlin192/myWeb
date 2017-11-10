const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const yes = require('yes-https');

//authentication
const session = require('express-session');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const crypto = require("crypto");
const expressValidator = require('express-validator');

// routers
const index = require('./routes/index');
const account = require('./routes/account');
const users = require('./routes/users');
const react = require('./routes/react');

// database
// var db = require('./models/db');

// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const config = require('./webpack.config.js');
// const compiler = webpack(config);

var app = express();

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

app.use(session({
    secret: crypto.randomBytes(10).toString(),
    resave: false, // don't renew the session cookies
    saveUninitialized: false, // don't send cookies unless logged in
    // cookie: { secure: true }
}));


app.use(passport.initialize());
app.use(passport.session());

// router
app.use(yes());
app.use('/', index);
app.use('/account', account);
app.use('/users', users);
app.use('/react', react);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // console.error("server error", err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


function ensureSecure(req, res, next){
    if(req.secure){
        return next();
    }
    res.redirect('https://' + req.hostname + req.url); // express 4.x
}


module.exports = app;
