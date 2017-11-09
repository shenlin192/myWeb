/**
 * Created by shenlin on 03/11/2017.
 */
var db = require('./db');
var User = db.model('User', {
    userName: {type: String, required: true},
    password: {type: String, required: true},
    bad: {type: String},
    email: {type: String, required: true},
    token: {type: Number},
    active: {type: Boolean, default: false},
    date: {type: Date, required: true, default: Date.now}
});

module.exports = User;