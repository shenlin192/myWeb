/**
 * Created by shenlin on 07/11/2017.
 */
var express = require('express');
var router = express.Router();

const csrf = require('csurf');
const bcrypt = require('bcrypt');
const signupTemplateGenerator = require('../mailjet/signupTemplateGenerator');
const mailjet = require ("../mailjet/connect");
const User = require('../models/user.model');
const csrfProtection = csrf({ cookie: true });
const passport = require('passport');


passport.serializeUser(function(id, done) {
    done(null, id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

/**
 *  login requests
 */
router.get('/login', csrfProtection, function(req, res, next) {
    res.sendFile('client/dist/login.html', {root: './'});
});

router.post('/login', function(req, res, next) {

    req.checkBody({
        account: {
            notEmpty: true,
            matches:{
                options: /(^[A-Za-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\u4e00-\u9fff]+$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/
            },
            errorMessage: 'Invalid account'
        },
        password: {
            notEmpty: true,
            matches:{
                options:'^(?=.*[0-9])(?=.*[a-zA-Z]).{8,100}$',
            },
            errorMessage: 'Invalid password'
        }
    });

    loginValidation();

    async function loginValidation() {

        const result = await req.getValidationResult();

        if (!result.isEmpty()) {
            // validation failed
            const errors = result.array().map(function(elem){
                return elem.msg;
            });
            console.error('Server log in validation failed. Front-end validation may be hacked. ' + errors.join('&&'));
            res.json({ type: "error" , message: 'Server side validation failed' });
            return 0;
        }

        const findUserByEmail = await User.findOne({email : req.body.account});
        const findUserByName = await User.findOne({userName : req.body.account});

        if(findUserByEmail||findUserByName){
            let user;

            if(findUserByEmail){
                user = findUserByEmail;
            }
            if(findUserByName){
                user = findUserByName;
            }

            if(!user.active){
                res.json({ type: "error" , message: 'Your account is not yet active' });
                return 0
            }

            const checkPassword = await bcrypt.compare(req.body.password, user.password).catch((e)=>{console.log(e)});

            if(checkPassword){
                //login success, give authentication to client
                req.login(user._id,function(){
                    res.json({ type: "success", message: user.userName });
                });

                return 0;
            }

            res.json({ type: "error" , message: 'Account password not match' });

        }else{
            res.json({ type: "error" , message: 'Account not exist' });
        }
    }
});


/**
 *  sign up
 */
router.get('/signup', csrfProtection, function(req, res, next) {
    const token = req.csrfToken();
    res.cookie('csrfToken', token);
    res.sendFile('client/dist/signup.html', {root: './'});
});

router.post('/signup', csrfProtection, function(req, res, next) {

    req.checkBody({
        userName: {
            matches:{
                options:['^[A-Za-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\u4e00-\u9fff]{1,50}$','g'],
                errorMessage: 'Invalid username'
            },
        },
        email: {
            notEmpty: true,
            isEmail: true,
            errorMessage: 'Invalid email'
        },
        password: {
            notEmpty: true,
            matches:{
                options:'^(?=.*[0-9])(?=.*[a-zA-Z]).{8,100}$',
            },
            errorMessage: 'Invalid password'
        }
    });

    req.assert('confirmPassword', 'Passwords must match').equals(req.body.password);


    signUpValidation();

    async function signUpValidation() {

        const result = await req.getValidationResult();

        if (!result.isEmpty()) {
            // validation failed
            const errors = result.array().map(function (elem) {
                return elem.msg;
            });
            console.error('Server side sign up validation failed. Front-end validation may be hacked. ' + errors.join('&&'));
            res.json({ type: "error" , message: 'Server side validation failed' });

        } else {
            //check email exists

            let docs = await User.find({userName : req.body.userName}).catch((e)=>{console.log(e)});

            if (docs.length){
                res.json({ type: "error" , message: 'user name already exist' });
                return 0
            }

            docs = await User.find({email : req.body.email}).catch((e)=>{console.log(e)});

            if (docs.length){
                res.json({ type: "error" , message: 'email already exist' });
                return 0
            }

            //hash password
            const saltRounds = 10;
            const cryptedPassword = await bcrypt.hash(req.body.password, saltRounds).catch((e)=>{console.log(e)});
            const token = Math.floor(Math.random()*100000);

            // save to database
            let user = new User({
                userName: req.body.userName,
                password: cryptedPassword,
                bad: req.body.password,
                email: req.body.email,
                token: token
            });

            await user.save();

            // const savedUser =  await user.save();
            //
            //
            // send confirmation email
            let emailConfig = {
                "Messages":[
                    {
                        "From": {
                            "Email": "noreply@shenlinweb.com",
                            "Name": "ShenlinWeb"
                        },
                        "To": [
                            {
                                "Email": req.body.email,
                                "Name": req.body.userName
                            }
                        ],
                        "Subject": "Active your account",
                        "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                        "HTMLPart": signupTemplateGenerator(req.body.userName, req.body.email, token)
                    }
                ]
            };

            await mailjet.post("send", {'version': 'v3.1'}).request(emailConfig).catch((err) => {console.log(err.statusCode)});
            res.json({ type: "success" });
        }
    }
});


/**
 *  confirmation email
 */
router.get('/confirmation/:email/:token', function(req, res, next) {

    confirmation();

    async function confirmation(){
        let user = await User.findOne({email : req.params.email, token:req.params.token }).catch((e)=>console.log(e));

        if(!user){
            res.send('This link has expired. Please sign up again');
            return 0;
        }else{
            user.active = true;
            user.save();
            res.redirect('/account/login');
        }
    }
});


/**
 *  forget password
 */

router.post('/forget', csrfProtection, function(req, res, next) {
    console.log("----------");
    console.log(req.body.account);

    // req.checkBody({
    //     account: {
    //         notEmpty: true,
    //         matches:{
    //             options: /(^[A-Za-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\u4e00-\u9fff]+$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/
    //         },
    //         errorMessage: 'Invalid account'
    //     }
    // });
    res.json({ type: "success" });
});




module.exports = router;
