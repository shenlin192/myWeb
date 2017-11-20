/**
 * Created by shenlin on 08/10/2017.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
// const helper = require('./global');

/* GET home page. */
router.get('/', authenticationMiddleware(), function(req, res, next) {
    res.sendFile('public/dashboard/build/index.html', {root: './'});
});


function authenticationMiddleware () {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        console.log('.............',req.isAuthenticated());
        res.end();
        // if (req.isAuthenticated()) return next();
        // res.redirect('/account/login')
    }
}

module.exports = router;