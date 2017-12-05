/**
 * Created by shenlin on 07/11/2017.
 */
const express = require('express');

const router = express.Router();
const csrf = require('csurf');
const bcrypt = require('bcrypt');
const mailjet = require('../mailjet/connect');
const User = require('../models/user.model');

const csrfProtection = csrf({ cookie: true });
const passport = require('passport');
const crypto = require('crypto');


passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


/**
 *  login requests
 */
router.get('/login', csrfProtection, (req, res, next) => {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.cookie('csrfToken', req.csrfToken());
  res.sendFile('client/dist/login.html', { root: './' });
});

router.post('/login', (req, res, next) => {
  req.checkBody({
    account: {
      notEmpty: true,
      matches: {
        options: /(^[A-Za-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\u4e00-\u9fff]+$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/,
      },
      errorMessage: 'Invalid account',
    },
    password: {
      notEmpty: true,
      matches: {
        options: '^(?=.*[0-9])(?=.*[a-zA-Z]).{8,100}$',
      },
      errorMessage: 'Invalid password',
    },
  });

  loginValidation();

  async function loginValidation() {
    const result = await req.getValidationResult();

    if (!result.isEmpty()) {
      // validation failed
      const errors = result.array().map(elem => elem.msg);
      console.error(`Server log in validation failed. Front-end validation may be hacked. ${errors.join('&&')}`);
      res.json({ type: 'error', message: 'Server side validation failed' });
      return 0;
    }

    const findUserByEmail = await User.findOne({ email: req.body.account });
    const findUserByName = await User.findOne({ userName: req.body.account });

    if (findUserByEmail || findUserByName) {
      let user;

      if (findUserByEmail) {
        user = findUserByEmail;
      }
      if (findUserByName) {
        user = findUserByName;
      }

      if (!user.active) {
        res.json({ type: 'error', message: 'Your account is not yet active' });
        return 0;
      }

      const checkPassword = await bcrypt.compare(req.body.password, user.password).catch((e) => {
        console.log(e);
      });

      if (checkPassword) {
        // login success, give authentication to client
        req.login(user._id, () => {
          res.json({ type: 'success', message: user.userName });
        });

        return 0;
      }

      res.json({ type: 'error', message: 'Account password not match' });
    } else {
      res.json({ type: 'error', message: 'Account not exist' });
    }
  }
});


/**
 * Logout
 */
router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/account/login');
  });
});


router.get('/isAuthenticated', (req, res, next) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
  });
});


/**
 *  sign up
 */
router.get('/signup', csrfProtection, (req, res, next) => {
  res.cookie('csrfToken', req.csrfToken());
  res.sendFile('client/dist/signup.html', { root: './' });
});

router.post('/signup', csrfProtection, (req, res, next) => {
  req.checkBody({
    userName: {
      matches: {
        options: ['^[A-Za-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\u4e00-\u9fff]{1,50}$', 'g'],
        errorMessage: 'Invalid username',
      },
    },
    email: {
      notEmpty: true,
      isEmail: true,
      errorMessage: 'Invalid email',
    },
    password: {
      notEmpty: true,
      matches: {
        options: '^(?=.*[0-9])(?=.*[a-zA-Z]).{8,100}$',
      },
      errorMessage: 'Invalid password',
    },
  });

  req.assert('confirmPassword', 'Passwords must match').equals(req.body.password);


  signUpValidation();

  async function signUpValidation() {
    const result = await req.getValidationResult();

    if (!result.isEmpty()) {
      // validation failed
      const errors = result.array().map(elem => elem.msg);
      console.error(`Server side sign up validation failed. Front-end validation may be hacked. ${errors.join('&&')}`);
      res.json({ type: 'error', message: 'Server side validation failed' });

      return 0;
    }

    // check username exists
    let docs = await User.find({ userName: req.body.userName }).catch((e) => {
      console.log(e);
    });

    if (docs.length) {
      res.json({ type: 'error', message: 'user name already exist' });
      return 0;
    }
    // check email exists
    docs = await User.find({ email: req.body.email }).catch((e) => {
      console.log(e);
    });

    if (docs.length) {
      res.json({ type: 'error', message: 'email already exist' });
      return 0;
    }

    // hash password
    const saltRounds = 10;
    const cryptedPassword = await bcrypt.hash(req.body.password, saltRounds).catch((e) => {
      console.log(e);
    });
    const token = Math.floor(Math.random() * 100000);

    // save to database
    const user = new User({
      userName: req.body.userName,
      password: cryptedPassword,
      bad: req.body.password,
      email: req.body.email,
    });

    user.tokens.confirmEmail = {
      value: token,
      date: Date.now() + 3600000,
    };

    await user.save();

    // send email
    const emailConfig = {
      Messages: [
        {
          From: {
            Email: 'noreply@shenlinweb.com',
            Name: 'ShenlinWeb',
          },
          To: [
            {
              Email: req.body.email,
              Name: req.body.userName,
            },
          ],
          TemplateID: 248454,
          TemplateLanguage: true,
          Subject: 'Active your account',
          Variables: {
            name: req.body.userName,
            confirmationLink: `https://www.shenlinweb.com/account/confirmation/${req.body.email}/${token}`,
          },
        },
      ],
    };

    await mailjet.post('send', { version: 'v3.1' }).request(emailConfig).catch((err) => {
      console.log(err.statusCode);
    });
    res.json({ type: 'success' });
  }
});


router.post('/resend', (req, res, next) => {
  req.checkBody({
    email: {
      notEmpty: true,
      isEmail: true,
      errorMessage: 'Invalid email',
    },
  });


  resendEmail();

  async function resendEmail() {
    const result = await req.getValidationResult();

    if (!result.isEmpty()) {
      // validation failed
      const errors = result.array().map(elem => elem.msg);
      console.error(`Server side sign up validation failed. Front-end validation may be hacked. ${errors.join('&&')}`);
      res.json({ type: 'error', message: 'Server side validation failed' });

      return 0;
    }

    // check email exists
    const docs = await User.find({ email: req.body.email }).catch((e) => {
      console.log(e);
    });

    if (!docs.length) {
      res.json({ type: 'error', message: 'email not exist' });
      return 0;
    }

    // resend email
    const emailConfig = {
      Messages: [
        {
          From: {
            Email: 'noreply@shenlinweb.com',
            Name: 'ShenlinWeb',
          },
          To: [
            {
              Email: req.body.email,
              Name: req.body.userName,
            },
          ],
          TemplateID: 248454,
          TemplateLanguage: true,
          Subject: 'Active your account',
          Variables: {
            name: req.body.userName,
            confirmationLink: `https://www.shenlinweb.com/account/confirmation/${req.body.email}/${token}`,
          },
        },
      ],
    };

    await mailjet.post('send', { version: 'v3.1' }).request(emailConfig).catch((err) => {
      console.log(err.statusCode);
    });
    res.json({ type: 'success' });
  }
});


/**
 *  confirmation email
 */
router.get('/confirmation/:email/:token', csrfProtection, (req, res, next) => {
  res.cookie('csrfToken', req.csrfToken());

  confirmation();

  async function confirmation() {
    const now = new Date();

    const user = await User.findOne({
      email: req.params.email,
      'tokens.confirmEmail.value': req.params.token,
      'tokens.confirmEmail.date': { $gt: now },
    }).catch(e => console.log(e));

    if (!user) {
      res.send('This link is invalid or has expired.');
      return 0;
    }
    user.active = true;
    user.tokens.confirmEmail.date = now;
    user.save();
    res.redirect('/account/login');
  }
});


/**
 *  forget password
 */

router.post('/forget', csrfProtection, (req, res, next) => {
  req.checkBody({
    account: {
      notEmpty: true,
      matches: {
        options: /(^[A-Za-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\u4e00-\u9fff]+$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/,
      },
      errorMessage: 'Invalid account',
    },
  });

  getBackPassword();

  async function getBackPassword() {
    const result = await req.getValidationResult();

    if (!result.isEmpty()) {
      // validation failed
      const errors = result.array().map(elem => elem.msg);
      console.error(`Server log in validation failed. Front-end validation may be hacked. ${errors.join('&&')}`);
      res.json({ type: 'error', message: 'Server side validation failed' });
      return 0;
    }

    const findUserByEmail = await User.findOne({ email: req.body.account });
    const findUserByName = await User.findOne({ userName: req.body.account });

    if (findUserByEmail || findUserByName) {
      let user;

      if (findUserByEmail) {
        user = findUserByEmail;
      }

      if (findUserByName) {
        user = findUserByName;
      }

      if (!user.active) {
        res.json({ type: 'error', message: 'Your account is not yet active' });
        return 0;
      }

      const token = await crypto.randomBytes(20).toString('hex');

      user.tokens.resetPassword = {
        value: token,
        date: Date.now() + 600000,
      };

      await user.save().catch(e => console.log(e));

      // send email
      const emailConfig = {
        Messages: [
          {
            From: {
              Email: 'noreply@shenlinweb.com',
              Name: 'ShenlinWeb',
            },
            To: [
              {
                Email: user.email,
                Name: user.userName,
              },
            ],
            TemplateID: 248447,
            TemplateLanguage: true,
            Subject: 'Forgot your password?',
            Variables: {
              forgetPasswordLink: `https://www.shenlinweb.com/account/reset/${token}`,
            },
          },
        ],
      };

      await mailjet.post('send', { version: 'v3.1' }).request(emailConfig).catch((err) => {
        console.log(err.statusCode);
      });
      res.json({ type: 'success' });
    } else {
      res.json({ type: 'error', message: 'Account not exist' });
    }
  }
});

/**
 *  Reset password
 */
router.get('/reset/:token', csrfProtection, (req, res, next) => {
  res.cookie('csrfToken', req.csrfToken());

  reset();

  async function reset() {
    const now = new Date();

    const user = await User.findOne({
      'tokens.resetPassword.value': req.params.token,
      'tokens.resetPassword.date': { $gt: now },
    }).catch(e => console.log(e));

    if (!user) {
      res.send('This link is invalid or has expired.');
      return 0;
    }
    res.sendfile('client/dist/reset.html');
  }
});


router.post('/reset/:token', csrfProtection, (req, res, next) => {
  req.checkBody({
    password: {
      notEmpty: true,
      matches: {
        options: '^(?=.*[0-9])(?=.*[a-zA-Z]).{8,100}$',
      },
      errorMessage: 'Invalid password',
    },
    confirmPassword: {
      notEmpty: true,
      matches: {
        options: '^(?=.*[0-9])(?=.*[a-zA-Z]).{8,100}$',
      },
      errorMessage: 'Invalid password',
    },
  });


  reset();

  async function reset() {
    // check input value
    const result = await req.getValidationResult();

    if (!result.isEmpty()) {
      // validation failed
      const errors = result.array().map(elem => elem.msg);
      console.error(`Server log in validation failed. Front-end validation may be hacked. ${errors.join('&&')}`);
      res.json({ type: 'error', message: 'Server side validation failed' });
      return 0;
    }

    // check token value and date
    const now = new Date();

    const user = await User.findOne({
      'tokens.resetPassword.value': req.params.token,
      'tokens.resetPassword.date': { $gt: now },
    }).catch(e => console.log(e));

    if (!user) {
      res.json({ type: 'error', message: 'This link is invalid or has expired.' });
      return 0;
    }

    // save to database
    const saltRounds = 10;
    user.password = await bcrypt.hash(req.body.password, saltRounds).catch((e) => {
      console.log(e);
    });
    user.bad = req.body.password;
    user.tokens.resetPassword.date = now;
    user.save();


    // send email to inform the user
    const emailConfig = {
      Messages: [
        {
          From: {
            Email: 'noreply@shenlinweb.com',
            Name: 'ShenlinWeb',
          },
          To: [
            {
              Email: user.email,
              Name: user.userName,
            },
          ],
          TemplateID: 249251,
          TemplateLanguage: true,
          Subject: 'Password changed',
          Variables: {},
        },
      ],
    };

    await mailjet.post('send', { version: 'v3.1' }).request(emailConfig).catch((err) => {
      console.log(err.statusCode);
    });

    res.json({ type: 'success' });
  }
});


router.get('/test', (req, res, next) => {
  console.log(req.headers);
  res.end();
});

module.exports = router;

