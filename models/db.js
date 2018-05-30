/**
 * Created by shenlin on 03/11/2017.
 */
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
  useMongoClient: true,
}).then(() => {
  console.log('connection successed');
}).catch((e) => {
  console.error('connection failed', e);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
