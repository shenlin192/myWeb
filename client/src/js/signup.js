/**
 * Created by shenlin on 12/10/2017.
 */
import '../css/auth.scss';
import $ from 'jquery';
import backgroundAnimation from "./common/background.animation";
import validation from './common/validation';

backgroundAnimation();

const configuration = {
    userName: {
        presence: {
            message: "Username is required",
            fullMessages:false
        },

        length: {
            minimum: 1,
            maximum:50,
            message: "Username should contain > 1 and < 50 characters"
        },

        format: {
            pattern: /^[A-Za-z0-9àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ\u4e00-\u9fff]$/,
            message: "Username only accept English, French and Chinese characters",
        },
    },

    email: {
        // Email is required
        presence: {
            message: "email is required"
        },
        // and must be an email (duh)
        email: {
            message: "doesn't look like a valid email"
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
        equality: "password",
    }
} ;



// input animations
$('input[type="text"],input[type="password"],input[type="email"]').on('focus', (event)=>{
    $(event.currentTarget).prev().animate({'opacity': '1'}, 200)
}).on('blur', ()=>{
    $(event.currentTarget).prev().animate({'opacity': '.5'}, 200)
}).on('keyup', ()=> {
    console.log(
        validation(configuration,'form','auth-field', ".messages")
    );
    $(event.currentTarget).next().animate({'opacity': '1', 'right': '30'}, 200)
});




// $('form').submit(function (e) {
//     e.preventDefault();
//     e.stopImmediatePropagation();    // or it will submit twice
//
//     const formData = $(this).serializeArray();
//     $.ajax({
//         url: '/signup',
//         type: 'POST',
//         data: formData,
//         dataType: "json",
//         success: function () {
//             console.log("success")
//         },
//         error: function (e) {
//             console.log(e);
//             console.log("error");
//         },
//     });
// });


