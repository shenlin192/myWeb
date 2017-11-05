/**
 * Created by shenlin on 03/11/2017.
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://shenlin:shenlin@ds115085.mlab.com:15085/my-first-mongobd',{
    useMongoClient: true,
}).then(()=>{
    console.log('connection successed')
}).catch((e)=>{
    console.error('connection failed', e);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;