/**
 * Created by shenlin on 08/10/2017.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('public/client/build/construction.html', {root: './'});
    // res.sendFile( __dirname + '/../public/client/build/construction.html');
    // res.sendFile('../public/client/build/construction.html');
});


module.exports = router;