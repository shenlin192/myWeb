var express = require('express');
var router = express.Router();
var db = require('../models/db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const csrf = require('csurf');

var csrfProtection = csrf({ cookie: true });


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.sendFile('views/construction.html', {root: './'});
});

router.get('/CV', function(req, res, next) {
    res.sendFile('client/dist/cv.html', {root: './'});
});

router.get('/login', function(req, res, next) {
    res.sendFile('views/login.html', {root: './'});
});

router.get('/signup', csrfProtection, function(req, res, next) {
    var token = req.csrfToken();
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

        let result = await req.getValidationResult();

        if (!result.isEmpty()) {
            const errors = result.array().map(function (elem) {
                return elem.msg;
            });
            console.error('Server side sign up validation failed. Front-end validation may be hacked. ' + errors.join('&&'));
            res.json({ type: "error" , message: 'Server side validation failed' });
        } else {
            // connect to database

        }
    }

    // res.json({ message: 'post created!' });
    res.json({ type: "error" , message: 'Server side validation failed' });



    // db.get().collection('user').save(req.body, (err, result) => {
    //     if (err) {
    //         return console.log(err);
    //     }else{
    //         console.log('saved to database');
    //         console.log(result);
    //     }
    //     res.json({success : "Updated Successfully", status : 200});
    // });
});

router.get('/test', function(req, res, next) {
    res.sendFile('views/test.html', {root: './'});
});


router.get('/test2', (req, res) => {
    db.get().collection('quotes').find().toArray(function(err, results) {
        console.log(results);
        res.end();
        // send HTML file populated with quotes here
    });
});

router.post('/quotes', (req, res) => {
    console.log(req.body);
    db.get().collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database');
        res.redirect('/')
    })
});

module.exports = router;
