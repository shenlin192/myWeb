/**
 * Created by shenlin on 12/10/2017.
 */
import '../css/auth.scss';

import $ from 'jquery';
import 'jquery-ui-bundle';
import './common/csrf.ajaxSetup';
import backgroundAnimation from "./common/background.animation";
import { processAnimation, errorAnimation, successAnimation } from './common/post.animation';
import validation from './common/validation';
import iziToast from 'izitoast';
import "babel-polyfill";

backgroundAnimation();



const configuration = {
    userName: {
        presence: {
            message: "Username is required",
        },

        length: {
            minimum: 1,
            maximum:50,
            message: "Username should contain > 1 and < 50 characters"
        },

        format: {
            pattern: /^[A-Za-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\u4e00-\u9fff]+$/,
            message: "Username only accept English, French and Chinese characters",
        },
    },

    email: {
        // Email is required
        presence: {
            message: "Email is required"
        },
        // and must be an email (duh)
        email: {
            message: "Doesn't look like a valid email"
        }
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


/**
 * sign up
 */

$('input[type="submit"]').on('click',function (e) {

    const result =  validation(configuration,formSelector,formGroupClassName,messageSelector);

    if(result){
        return 0
    }

    let formData = $('form').serializeArray();

    post();

    async function post(){

        processAnimation();

        const res = await $.ajax({
            url: '/account/signup',
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
            },1000)

        }else{

            successAnimation();

            setTimeout(function(){
                $('.success span').text(formData[1].value);
            },1400);

            // setTimeout(function(){
            //
            //     // count down
            //     let sec = 9;
            //     const timer = setInterval(function () {
            //         const span = $('.success span');
            //         span.animate({
            //             opacity: 0.25,
            //         }, 100, function() {
            //             span.css('opacity', 1);
            //             span.text(sec--);
            //         });
            //
            //         if (sec == -1) {
            //             span.fadeOut('fast');
            //             clearInterval(timer);
            //             window.location.href = '/account/login';
            //         }
            //     }, 1000);
            // },1400);
            //

            // await countDown(sec);
            //
            // window.location.replace('/login');
            //
            // function countDown(sec){
            //     return new Promise(
            //         function (resolve, reject) {
            //             const timer = setInterval(function () {
            //                 const span = $('.success span');
            //                 span.animate({
            //                     opacity: 0.25,
            //                 }, 500, function() {
            //                     span.css('opacity', 1);
            //                     span.text(sec--);
            //                 });
            //
            //                 if (sec == -1) {
            //                     span.fadeOut('fast');
            //                     clearInterval(timer);
            //                     resolve();
            //                 }
            //             }, 1000);
            //         }
            //     );
            // }

            // await (()=>
            //      new Promise((resolve, reject)=> {
            //         const timer = setInterval(()=> {
            //             const span = $('.success span');
            //             span.animate({
            //                 opacity: 0.25,
            //             }, 500, ()=> {
            //                 span.css('opacity', 1);
            //                 span.text(sec--);
            //             });
            //
            //             if (sec == -1) {
            //                 span.fadeOut('fast');
            //                 clearInterval(timer);
            //                 resolve();
            //                 }
            //             }, 1000);
            //         }
            //     )
            // )()


        }
    }
});




/**
 * resend confirmation email
 */
$('#resend').on('click',function(){

    post();

    async function post(){

        processAnimation();

        let formData = $('form').serializeArray();

        const res = await $.ajax({
            url: '/account/resend',
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
            },1000)
        }else{
            successAnimation();
            iziToast.error({
                title: 'Success',
                message: "An email has been send",
                position: 'topCenter',
            });
        }
    }
});