/**
 * Created by shenlin on 08/10/2017.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
const helper = require('./global');

/* GET home page. */
router.get('/', helper.authenticationMiddleware(), function(req, res, next) {
    res.sendFile('public/dashboard/build/index.html', {root: './'});
});



module.exports = router;