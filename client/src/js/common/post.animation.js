/**
 * Created by shenlin on 11/11/2017.
 */
import $ from 'jquery';

const processing = $('.processing');
const auth = $('.auth');
/**
 *  Animation
 */
export function processAnimation() {
  auth.addClass('fallDown');

  setTimeout(() => {
    auth.addClass('goLeft');
  }, 300);
  setTimeout(() => {
    processing.show().animate({ right: '-25vw' }, { easing: 'easeOutQuint', duration: 600, queue: false });
    processing.animate({ opacity: 1 }, { duration: 200, queue: false });
  }, 500);
}

export function errorAnimation() {
  processing.show().animate({ right: 90 }, { easing: 'easeOutQuint', duration: 600, queue: false });
  processing.animate({ opacity: 0 }, { duration: 200, queue: false }).addClass('visible');
  auth.removeClass('goLeft');
  auth.removeClass('fallDown');
}

export function successAnimation() {
  setTimeout(() => {
    processing.show().animate({ right: 90 }, { easing: 'easeOutQuint', duration: 600, queue: false });
    processing.animate({ opacity: 0 }, { duration: 200, queue: false }).addClass('visible');
    auth.removeClass('goLeft');
  }, 1000);

  setTimeout(() => {
    auth.removeClass('fallDown');
    $('.auth .auth-title').fadeOut(123);
    $('.auth .auth-fields').fadeOut(123);
    $('.auth .success').fadeIn();
  }, 1400);
}

