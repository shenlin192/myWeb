var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('index');
  // res.render('index', { title: 'Express' });
    res.sendFile('views/construction.html', {root: './'});
});

router.get('/CV', function(req, res, next) {
    res.sendFile('views/cv.html', {root: './'});
});

module.exports = router;
