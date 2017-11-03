/**
 * Created by shenlin on 12/10/2017.
 */
import '../css/auth.scss';
import $ from 'jquery';
import backgroundAnimation from "./common/background.animation";
import validation from './common/validation';
import izitoast from 'izitoast';

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
        equality: {
            attribute: "password",
            message: "Doesn't match password",
        }
    }
} ;


// input animations
$('input[type="text"],input[type="password"],input[type="email"]').on('focus', (event)=>{
    $(event.currentTarget).prev().animate({'opacity': '1'}, 200)
}).on('blur', ()=>{
    $(event.currentTarget).prev().animate({'opacity': '.5'}, 200)
}).on('keyup', ()=> {
    // If input not in errors, show animation
    const result = validation(configuration,'form','auth-field', ".messages");

    if(result){
        // has error
        if(!result.hasOwnProperty(event.target.name)){
            $(event.currentTarget).next().animate({'opacity': '1', 'right': '30'}, 200)
        }else{
            $(event.currentTarget).next().animate({'opacity': '0', 'right': '30'}, 200)
        }
    }else{
        // validation pass
        $(event.currentTarget).next().animate({'opacity': '1', 'right': '30'}, 200)
    }
});



$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (settings.type == 'POST' || settings.type == 'PUT' || settings.type == 'DELETE') {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = $.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-CSRF-Token", getCookie('csrfToken'));
            }
        }
    }
});



$('form').submit(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();    // or it will submit twice

    let formData = $(this).serializeArray();

    $.ajax({
        url: '/signup',
        type: 'POST',
        data: formData,
        dataType: "json",
    }).done((res)=>{
        // console.log(res)
        if(res.type==="error"){
            iziToast.error({
                title: 'Error',
                message: res.message
            });
        }
    }).fail((e)=>{
        console.error(e);
    });
});
