var express = require('express');
var router = express.Router();
var db = require('../models/db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Sign Up' });
});

router.post('/signup', function(req, res, next) {
   console.log(req.body);
    db.get().collection('user').save(req.body, (err, result) => {
        if (err) {
            return console.log(err);
        }else{
            console.log('saved to database');
            console.log(result);
        }
        res.json({success : "Updated Successfully", status : 200});
    });
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
