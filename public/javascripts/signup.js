/**
 * Created by shenlin on 12/10/2017.
 */
// $('input[type="submit"]').click(function(){
//     $('.login').addClass('test')
//     setTimeout(function(){
//         $('.login').addClass('testtwo')
//     },300);
//     setTimeout(function(){
//         $(".authent").show().animate({right:-320},{easing : 'easeOutQuint' ,duration: 600, queue: false });
//         $(".authent").animate({opacity: 1},{duration: 200, queue: false }).addClass('visible');
//     },500);
//     setTimeout(function(){
//         $(".authent").show().animate({right:90},{easing : 'easeOutQuint' ,duration: 600, queue: false });
//         $(".authent").animate({opacity: 0},{duration: 200, queue: false }).addClass('visible');
//         $('.login').removeClass('testtwo')
//     },2500);
//     setTimeout(function(){
//         $('.login').removeClass('test')
//         $('.login div').fadeOut(123);
//     },2800);
//     setTimeout(function(){
//         $('.success').fadeIn();
//     },3200);
// });

// input animations
$('input[type="text"],input[type="password"],input[type="email"]').on('focus', function () {
    $(this).prev().animate({'opacity': '1'}, 200)
}).on('blur', function () {
    $(this).prev().animate({'opacity': '.5'}, 200)
}).on('keyup', function () {
    if (!$(this).val() == '') {
        $(this).next().animate({'opacity': '1', 'right': '30'}, 200)
    } else {
        $(this).next().animate({'opacity': '0', 'right': '20'}, 200)
    }
});


var constraints = {
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
    // var formData = $(this).serializeArray();
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
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    var preGamma = 0 ;
    var preBeta = 90;
    window.addEventListener('deviceorientation', function (event) {
        var gamma = event.gamma;
        var beta = event.beta;
        var flag = false;
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
            var xPos = (Math.round(gamma)+90)/1.8+'%';
            var yPos = (Math.round(beta)+180)/3.6+'%';
            console.log("gamma",gamma,"preGamma",preGamma);
            console.log("beta",beta,"preBeta",beta);
            console.log(xPos,yPos)
            $('body').stop().animate({
                'background-position-x': xPos,
                'background-position-y': yPos
            }, 3000, 'linear');
        }
    }, false);
} else {
    alert("no device support");
}
