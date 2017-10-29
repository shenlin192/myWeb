/**
 * Created by shenlin on 12/10/2017.
 */
import $ from 'jquery';
import '../css/auth.scss';

// input animations
$('input[type="text"],input[type="password"],input[type="email"]').on('focus', ()=>{
    $(this).prev().animate({'opacity': '1'}, 200)
}).on('blur', ()=>{
    $(this).prev().animate({'opacity': '.5'}, 200)
}).on('keyup', ()=> {
    if (!$(this).val() == '') {
        $(this).next().animate({'opacity': '1', 'right': '30'}, 200)
    } else {
        $(this).next().animate({'opacity': '0', 'right': '20'}, 200)
    }
});


const constraints = {
    userName: {
        presence: true,
        format: {
            pattern: /^(34|37|4|5[1-5]).*$/,
            message: function (value, attribute, validatorOptions, attributes, globalOptions) {
                return validate.format("^%{num} is not a valid credit card number", {
                    num: value
                });
            }
        },
        length: function (value, attributes, attributeName, options, constraints) {
            if (value) {
                // Amex
                if ((/^(34|37).*$/).test(value)) return {is: 15};
                // Visa, Mastercard
                if ((/^(4|5[1-5]).*$/).test(value)) return {is: 16};
            }
            // Unknown card, don't validate length
            return false;
        }
    },
};


$('form').submit(function (e) {
    e.preventDefault();
    // let formData = $(this).serializeArray();
    // $.ajax({
    //     url: '/signup',
    //     type: 'POST',
    //     data: formData,
    //     dataType: "json",
    //     success: function () {
    //         console.log("success")
    //     },
    //     error: function (e) {
    //         console.log(e);
    //         console.log("error");
    //     },
    // });

});


function userNameCheck() {

}


function emailCheck(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
        return true
    } else {
        return false
    }
}


function passwordCheck(password, maxLen) {
    if (input.length < maxLen) {
        return true
    } else {
        return false
    }
}

function confirmPasswordCheck() {

}



if (window.DeviceOrientationEvent) {
    let preGamma = 0 ;
    let preBeta = 90;
    window.addEventListener('deviceorientation', function (event) {
        let gamma = event.gamma;
        let beta = event.beta;
        let flag = false;
        if(gamma > preGamma+5||gamma < preGamma-5){
            preGamma = gamma;
            flag = true;
        }

        if(beta > preBeta+5||beta < preBeta-5){
            preBeta = beta;
            flag = true;
        }

        // create only when changes
        if(flag){
            let xPos = (Math.round(gamma)+90)/1.8+'%';
            let yPos = (Math.round(beta)+180)/3.6+'%';
            console.log("gamma",gamma,"preGamma",preGamma);
            console.log("beta",beta,"preBeta",beta);
            console.log(xPos,yPos);
            $('body').stop().animate({
                'background-position-x': xPos,
                'background-position-y': yPos
            }, 3000, 'linear');
        }
    }, false);
} else {
    alert("no device support");
}
