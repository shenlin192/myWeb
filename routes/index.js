var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var csrf = require('csurf');
var bcrypt = require('bcrypt');
var signupTemplateGenerator = require('../mailjet/signupTemplateGenerator');
const mailjet = require ("../mailjet/connect");
const User = require('../models/user.model');
const csrfProtection = csrf({ cookie: true });


/* GET home page. */
router.get('/', function(req, res, next){

    res.sendFile('views/construction.html', {root: './'});
    // console.log('h----------');
    console.log(req.user);
    // console.log(req.isAuthenticated());
});

router.get('/CV', function(req, res, next) {
    res.sendFile('client/dist/cv.html', {root: './'});
});

module.exports = router;
