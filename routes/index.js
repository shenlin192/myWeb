var express = require('express');
var router = express.Router();
var db = require('../models/db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var csrf = require('csurf');
var bcrypt = require('bcrypt');

const User = require('../models/user.model');
const csrfProtection = csrf({ cookie: true });


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('views/construction.html', {root: './'});
});

router.get('/CV', function(req, res, next) {
    res.sendFile('client/dist/cv.html', {root: './'});
});

router.get('/login', function(req, res, next) {
    res.sendFile('views/login.html', {root: './'});
});

router.get('/signup', csrfProtection, function(req, res, next) {
    const token = req.csrfToken();
    res.cookie('csrfToken', token);
    res.sendFile('client/dist/signup.html', {root: './'});
});

router.post('/signup', csrfProtection, function(req, res, next) {

    req.checkBody({
        userName: {
            matches:{
                options:['^[A-Za-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\u4e00-\u9fff]{1,50}$','g'],
                errorMessage: 'Invalid username'
            },
        },
        email: {
            notEmpty: true,
            isEmail: true,
            errorMessage: 'Invalid email'
        },
        password: {
            notEmpty: true,
            matches:{
                options:'^(?=.*[0-9])(?=.*[a-zA-Z]).{8,100}$',
            },
            errorMessage: 'Invalid password'
        }
    });

    req.assert('confirmPassword', 'Passwords must match').equals(req.body.password);

    signUpValidation();

    async function signUpValidation() {

        const result = await req.getValidationResult();

        if (!result.isEmpty()) {
            // validation failed
            const errors = result.array().map(function (elem) {
                return elem.msg;
            });
            console.error('Server side sign up validation failed. Front-end validation may be hacked. ' + errors.join('&&'));
            res.json({ type: "error" , message: 'Server side validation failed' });

        } else {
            //check email exists

            let docs = await User.find({userName : req.body.userName});

            if (docs.length){
                res.json({ type: "error" , message: 'user name already exist' });
                return 0
            }

            docs = await User.find({email : req.body.email});

            if (docs.length){
                res.json({ type: "error" , message: 'email already exist' });
                return 0
            }

            //hash password
            const saltRounds = 10;
            const cryptedPassword = await bcrypt.hash(req.body.password, saltRounds);

            // save to database
            let user = new User({
                userName: req.body.userName,
                password: cryptedPassword,
                email: req.body.email,
                token: Math.floor(Math.random()*100000)
            });

            await user.save();
            // send confirmation email
            res.json({ type: "success" });
        }
    }
});

router.get('/test', function(req, res, next) {

    res.end();

    // res.sendFile('views/test.html', {root: './'});

});


router.get('/test2', (req, res) => {
    // db.get().collection('quotes').find().toArray(function(err, results) {
    //     console.log(results);
    //     res.end();
    //     // send HTML file populated with quotes here
    // });
});

router.post('/quotes', (req, res) => {
    console.log(req.body);
    // db.get().collection('quotes').save(req.body, (err, result) => {
    //     if (err) return console.log(err);
    //     console.log('saved to database');
    //     res.redirect('/')
    // })
});

module.exports = router;
