/**
 * Created by shenlin on 10/11/2017.
 */

import '../css/auth.scss';

import $ from 'jquery';
import 'jquery-ui-bundle';
import './common/csrf.ajaxSetup';
import backgroundAnimation from "./common/background.animation";
import validation from './common/validation';
import iziToast from 'izitoast';
import "babel-polyfill";

backgroundAnimation();



const configuration = {
    password: {
        // Password is also required
        presence: {
            message: "Password is required"
        },
        length: {
            minimum: 8,
            message: "Password should have more then 8 characters"
        },
        // And must be at least 5 characters long
        format: {
            pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{2,}$/,
            message: "Password should contain at least a number and a alphabet"
        }
    },
    confirmPassword: {
        presence: {
            message: "Password confirmation is required"
        },
        equality: {
            attribute: "password",
            message: "Doesn't match password",
        }
    }
} ;

const formSelector = 'form';
const formGroupClassName = 'auth-field';
const messageSelector = '.messages';


// input animations
$('input[type="text"],input[type="password"],input[type="email"]').on('focus', (event)=>{
    $(event.currentTarget).prev().addClass('icon-animation')
}).on('blur', ()=>{
    $(event.currentTarget).prev().removeClass('icon-animation')
}).on('keyup', ()=> {
    // If input not in errors, show animation
    let result = validation(configuration,formSelector,formGroupClassName,messageSelector);

    if(result){

        if(!result.hasOwnProperty(event.target.name)&& event.target.value){
            $(event.currentTarget).next().animate({'opacity': '1', 'right': '30'}, 200)
        }else{
            $(event.currentTarget).next().animate({'opacity': '0', 'right': '30'}, 200)
        }

    }else{
        $(event.currentTarget).next().animate({'opacity': '1', 'right': '30'}, 200)
    }
});


$('input[type="submit"]').on('click',function (e) {

    const result =  validation(configuration,formSelector,formGroupClassName,messageSelector);

    if(result){
        return 0
    }

    let formData = $('form').serializeArray();

    post();

    async function post(){

        const processing = $(".processing");
        const auth =  $('.auth');

        auth.addClass('fallDown');

        setTimeout(function(){
            auth.addClass('goLeft');
        },300);

        setTimeout(function(){
            processing.show().animate({right:'-25vw'},{easing : 'easeOutQuint' ,duration: 600, queue: false });
            processing.animate({opacity: 1},{duration: 200, queue: false });
        },500);

        const res = await $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: formData,
            dataType: "json"
        }).catch((e)=>{ console.error(e);});

        if(res.type === "error"){

            setTimeout(function(){
                iziToast.error({
                    title: 'Error',
                    message: res.message,
                    position: 'topCenter',
                });

                processing.show().animate({right:90},{easing : 'easeOutQuint' ,duration: 600, queue: false });
                processing.animate({opacity: 0},{duration: 200, queue: false }).addClass('visible');
                auth.removeClass('goLeft');
                auth.removeClass('fallDown');
            },1000)

        }else{

            setTimeout(function(){
                processing.show().animate({right:90},{easing : 'easeOutQuint' ,duration: 600, queue: false });
                processing.animate({opacity: 0},{duration: 200, queue: false }).addClass('visible');
                auth.removeClass('goLeft');
            },1000);

            setTimeout(function(){
                auth.removeClass('fallDown');
                $('.auth .auth-title').fadeOut(123);
                $('.auth .auth-fields').fadeOut(123);
                $('.auth .success').fadeIn();

                let sec = 9;
                const timer = setInterval(function () {
                    const span = $('.success span');
                    span.animate({
                        opacity: 0.25,
                    }, 100, function() {
                        span.css('opacity', 1);
                        span.text(sec--);
                    });

                    if (sec == -1) {
                        span.fadeOut('fast');
                        clearInterval(timer);
                        window.location.href = '/account/login';
                    }
                }, 1000);

            },1400);
        }
    }
});

