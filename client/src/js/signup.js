/**
 * Created by shenlin on 12/10/2017.
 */

import $ from 'jquery';
import iziToast from 'izitoast';
import 'babel-polyfill';
import 'jquery-ui-bundle';
import has from './common/has';

import '../css/auth.scss';
import './common/csrf.ajaxSetup';
import backgroundAnimation from './common/background.animation';
import { processAnimation, errorAnimation, successAnimation } from './common/post.animation';
import validation from './common/validation';
import dynamicNav from './navigation';


dynamicNav();
backgroundAnimation();


const configuration = {
  userName: {
    presence: {
      message: 'Username is required',
    },

    length: {
      minimum: 1,
      maximum: 50,
      message: 'Username should contain > 1 and < 50 characters',
    },

    format: {
      pattern: /^[A-Za-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\u4e00-\u9fff]+$/,
      message: 'Username only accept English, French and Chinese characters',
    },
  },

  email: {
    // Email is required
    presence: {
      message: 'Email is required',
    },
    // and must be an email (duh)
    email: {
      message: "Doesn't look like a valid email",
    },
  },

  password: {
    // Password is also required
    presence: {
      message: 'Password is required',
    },
    length: {
      minimum: 8,
      message: 'Password should have more then 8 characters',
    },
    // And must be at least 5 characters long
    format: {
      pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{2,}$/,
      message: 'Password should contain at least a number and a alphabet',
    },
  },
  confirmPassword: {
    presence: {
      message: 'Password confirmation is required',
    },
    equality: {
      attribute: 'password',
      message: "Doesn't match password",
    },
  },
};

const formSelector = 'form';
const formGroupClassName = 'auth-field';
const messageSelector = '.messages';


// input animations
$('input[type="text"],input[type="password"],input[type="email"]').on('focus', (event) => {
  $(event.currentTarget).prev().addClass('icon-animation');
}).on('blur', (event) => {
  $(event.currentTarget).prev().removeClass('icon-animation');
}).on('keyup', (event) => {
  // If input not in errors, show animation
  const result = validation(configuration, formSelector, formGroupClassName, messageSelector);

  if (!has.call(result, event.target.name) && event.target.value) {
    $(event.currentTarget).next().animate({ opacity: '1', right: '30' }, 200);
  } else {
    $(event.currentTarget).next().animate({ opacity: '0', right: '30' }, 200);
  }
});


/**
 * sign up
 */

$('input[type="submit"]').on('click', () => {
  const result = validation(configuration, formSelector, formGroupClassName, messageSelector);

  if (result) {
    return 0;
  }

  const formData = $('form').serializeArray();

  async function post() {
    processAnimation();

    const res = await $.ajax({
      url: '/account/signup',
      type: 'POST',
      data: formData,
      dataType: 'json',
    }).catch((e) => {
      console.error(e);
    });

    if (res.type === 'error') {
      setTimeout(() => {
        iziToast.error({
          title: 'Error',
          message: res.message,
          position: 'topCenter',
        });
        errorAnimation();
      }, 1000);
    } else {
      successAnimation();

      setTimeout(() => {
        $('.success span').text(formData[1].value);
      }, 1400);
    }
  }
  post();
  return 0;
});


/**
 * resend confirmation email
 */
$('#resend').on('click', () => {
  async function post() {
    processAnimation();

    const formData = $('form').serializeArray();
    console.log(formData)

    const res = await $.ajax({
      url: '/account/resend',
      type: 'POST',
      data: formData,
      dataType: 'json',
    }).catch((e) => {
      console.error(e);
    });

    if (res.type === 'error') {
      setTimeout(() => {
        iziToast.error({
          title: 'Error',
          message: res.message,
          position: 'topCenter',
        });
        errorAnimation();
      }, 1000);
    } else {
      successAnimation();
      iziToast.success({
        title: 'Success',
        message: 'An email has been send',
        position: 'topCenter',
      });
    }
  }

  post();
});
