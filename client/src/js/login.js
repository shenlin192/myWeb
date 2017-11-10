/**
 * Created by shenlin on 12/10/2017.
 */

//
import '../css/auth.scss';

import $ from 'jquery';
import 'jquery-ui-bundle';
import './common/csrf.ajaxSetup';
import backgroundAnimation from "./common/background.animation";
import validation from './common/validation';
import iziToast from 'izitoast';
import "babel-polyfill";
//
backgroundAnimation();



const configuration = {
    account: {
        presence: {
            message: "Username/Email is required",
        },

        format: {
            pattern: /(^[A-Za-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\u4e00-\u9fff]+$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/,
            message: "Username/Email format not correct",
        },
    },

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
    }
} ;

const formSelector = 'form';
const formGroupClassName = 'auth-field';
const messageSelector = '.messages';



// input animations
$('input[type="text"],input[type="password"],input[type="email"]').on('focus', (event)=>{
    $(event.currentTarget).prev().addClass('icon-animation');
}).on('blur', ()=>{
    $(event.currentTarget).prev().removeClass('icon-animation');
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


const processing = $(".processing");
const auth =  $('.auth');


$('#login').on('click',function (e) {

    const result =  validation(configuration,formSelector,formGroupClassName,messageSelector);

    if(result){
        return 0
    }

    let formData = $('form').serializeArray();

    post();

    async function post(){

        processAnimation();

        const res = await $.ajax({
            url: '/account/login',
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
                errorAnimation();

            },1000);

        }else{
            successAnimation();
            setTimeout(function(){
                const success =  $('.auth .success');
                success.append(`<p>Welcome Back ${res.message}</p>`);
                success.fadeIn();
            },1400);
        }
    }
});


//forget pass word
$('.forget').on('click',function(e){
    e.preventDefault();

    // change layout
    $('input[type="password"]').closest('.auth-field').animate({right:"100%" , height:0, opacity: 0},{easing : 'easeOutQuint' ,duration: 600, queue: false });
    $('.auth-field-submit .forget, #login').animate({left:"100%" , height:0, opacity: 0},{easing : 'easeOutQuint' ,duration: 600, queue: false });
    $('.auth-title span').text('Please enter your account');
    $('#forget').show().animate({opacity: 1},{easing : 'easeOutQuint' ,duration: 600, queue: false})
1
});

$('#forget').on('click',function (e){
    // validation
    const result =  validation({account:configuration.account},formSelector,formGroupClassName,messageSelector);

    if(result){
        return 0
    }


    let formData = $('form').serializeArray();

    post();

    async function post(){
        processAnimation();

        const res = await $.ajax({
            url: '/account/forget',
            type: 'POST',
            data: formData,
            dataType: "json"
        }).catch((e)=>{ console.error(e);});
    }

});



function processAnimation(){
    auth.addClass('fallDown');

    setTimeout(function(){
        auth.addClass('goLeft');
    },300);
    setTimeout(function(){
        processing.show().animate({right:'-25vw'},{easing : 'easeOutQuint' ,duration: 600, queue: false });
        processing.animate({opacity: 1},{duration: 200, queue: false });
    },500);
}

function errorAnimation(){
    processing.show().animate({right:90},{easing : 'easeOutQuint' ,duration: 600, queue: false });
    processing.animate({opacity: 0},{duration: 200, queue: false }).addClass('visible');
    auth.removeClass('goLeft');
    auth.removeClass('fallDown');
}

function successAnimation(){
    setTimeout(function(){
        processing.show().animate({right:90},{easing : 'easeOutQuint' ,duration: 600, queue: false });
        processing.animate({opacity: 0},{duration: 200, queue: false }).addClass('visible');
        auth.removeClass('goLeft');
        auth.removeClass('fallDown');
        $('.auth .auth-title').fadeOut(123);
        $('.auth .auth-fields').fadeOut(123);
    },1000);
}