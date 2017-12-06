const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile('client/dist/index.html', { root: './' });
  // console.log(req.isAuthenticated());
});

router.get('/CV', (req, res, next) => {
  res.sendFile('client/dist/cv.html', { root: './' });
});

router.get('/info', (req, res, next) => {
  res.sendFile('client/dist/construction.html', { root: './' });
});

router.get('/about', (req, res, next) => {
  res.sendFile('client/dist/construction.html', { root: './' });
});


router.get('/collections', (req, res, next) => {
  res.sendFile('client/dist/collections.html', { root: './' });
});

module.exports = router;
