import $ from 'jquery';
import velocity from 'velocity-animate';
import '../css/index.scss';

window.jQuery = $;
/** ***************
 Summary
 **************** */

/* Watch the codecast to learn how this demo was made: https://www.youtube.com/watch?v=MDLiVB6g2NY&hd=1 */

/* This demo serves two purposes:
 1) Act as Velocity's primary visual test (in addition to the unit and load tests).
 2) Demonstrate all of Velocity's features.
 3) Demonstrate the performance capabilties of the DOM; WebGL and Canvas are not used in this demo.
 */

/* Intended demo behavior:
 1) A message box fades out.
 2) Dots are randomly assigned coordinates and opacities then translated and increased in opacity.
  This animation is then reversed.
 3) Meanwhile, the dots' container has its perspective,
  rotateZ, and opacity animated in a loop with a delay.
 4) Once the dot animation is complete, the message box fades back in.
 */

/** *******************
 Device Detection
 ******************** */

const isWebkit = /Webkit/i.test(navigator.userAgent);
const isChrome = /Chrome/i.test(navigator.userAgent);
const isMobile = !!('ontouchstart' in window);
const isAndroid = /Android/i.test(navigator.userAgent);
const isIE = document.documentMode;

/** ****************
 Redirection
 ***************** */

// if (isMobile && isAndroid && !isChrome) {
// alert("Although shenlinweb.com works on all mobile browsers,
// this page is for iOS devices or Android devices running Chrome only.");
//     window.location = "index.html";
// }

/** *************
 Helpers
 ************** */

/* Randomly generate an integer between two numbers. */
function r(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Override the default easing type with something a bit more jazzy. */
$.Velocity.defaults.easing = 'easeInOutsine';

/** *****************
 Dot Creation
 ****************** */

/* Differentiate dot counts based on roughly-guestimated device and browser capabilities. */
let dotsCount;
let dotsHtml = '';
const $count = $('#count');

if (window.location.hash) {
  dotsCount = window.location.hash.slice(1);
} else {
  dotsCount = isMobile ? (isAndroid ? 40 : 60) : (isChrome ? 175 : 125);
}

for (let i = 0; i < dotsCount; i += 1) {
  dotsHtml += "<div class='dot'></div>";
}

const $dots = $(dotsHtml);

$count.html(dotsCount);

/** ***********
 Setup
 ************ */

const $container = $('#container');
const $browserWidthNotice = $('#browserWidthNotice');
const $welcome = $('#welcome');

const screenWidth = window.screen.availWidth;
const screenHeight = window.screen.availHeight;
const chromeHeight = screenHeight - (document.documentElement.clientHeight || screenHeight);

const translateZMin = -725;
const translateZMax = 600;

const containerAnimationMap = {
  perspective: [215, 50],
  opacity: [0.90, 0.55],
};

/* IE10+ produce odd glitching issues when you rotateZ on a parent element
subjected to 3D transforms */
if (!isIE) {
  containerAnimationMap.rotateZ = [5, 0];
}

/* Ensure the user is full-screened; this demo's translations are relative to screen width,
 not window width. */
if ((document.documentElement.clientWidth / screenWidth) < 0.80) {
  $browserWidthNotice.show();
}

/** ***************
 Animation
 **************** */

/* Fade out the welcome message. */

$welcome
  .velocity({ opacity: [0, 0.75] }, {
    display: 'none',
    delay: 4500,
    duration: 1000,
    complete() {
      $welcome.html('<p>Welcome to shenlinweb</p>');
    },
  })
  .velocity({ opacity: 0.75, scale: 1.5 }, { duration: 3000, display: 'block' })
  .velocity({ opacity: 0 }, { duration: 1500, delay: 5500 });


/* Animate the dots' container. */

$container
  .css('perspective-origin', `${screenWidth / 2}px ${(screenHeight * 0.45) - chromeHeight}px`)
  .velocity(containerAnimationMap, { duration: 2000, delay: 5000 })
  .velocity('reverse', { delay: 12500 });

/* Special visual enhancement for WebKit browsers, which are faster at box-shadow manipulation. */
if (isWebkit) {
  $dots.css('boxShadow', '0px 0px 4px 0px #4bc2f1');
}

/* Animate the dots. */


$dots
  .velocity({
    translateX: [
      function () {
        return `+=${r(-screenWidth / 2.5, screenWidth / 2.5)}`;
      },
      function () {
        return r(0, screenWidth);
      },
    ],
    translateY: [
      function () {
        return `+=${r(-screenHeight / 2.75, screenHeight / 2.75)}`;
      },
      function () {
        return r(0, screenHeight);
      },
    ],
    translateZ: [
      function () {
        return `+=${r(translateZMin, translateZMax)}`;
      },
      function () {
        return r(translateZMin, translateZMax);
      },
    ],
    opacity: [
      function () {
        return Math.random();
      },
      function () {
        return Math.random() + 0.1;
      },
    ],
  }, { duration: 13500 })
  .velocity({ opacity: 0 }, {
    duration: 2000,
    complete() {
      $('.menu').css('display', 'block').velocity({ opacity: 1 }, { duration: 2000 });
    },
  })
  .appendTo($container);
