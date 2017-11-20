var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
    res.sendFile('client/dist/index.html', {root: './'});
    // console.log(req.isAuthenticated());
});

router.get('/CV', function(req, res, next) {
    res.sendFile('client/dist/cv.html', {root: './'});
});

router.get('/info', function(req, res, next) {
    res.sendFile('client/dist/construction.html', {root: './'});
});

router.get('/about', function(req, res, next) {
    res.sendFile('client/dist/construction.html', {root: './'});
});


router.get('/collections', function(req, res, next) {
    res.sendFile('client/dist/collections.html', {root: './'});
});

module.exports = router;
