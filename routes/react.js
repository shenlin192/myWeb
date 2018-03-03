/**
 * Created by shenlin on 08/10/2017.
 */
const express = require('express');

const router = express.Router();
// const path = require('path');
// const helper = require('./global');

/* GET home page. */
// router.get('/', helper.authenticationMiddleware(), (req, res, next) => {
//   res.sendFile('public/dashboard/build/index.html', { root: './' });
// });

router.get('/', (req, res, next) => {
  res.sendFile('public/dashboard/build/index.html', { root: './' });
});

module.exports = router;
