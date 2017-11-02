/**
 * Created by shenlin on 02/11/2017.
 */
import $ from 'jquery';

export default function backgroundAnimation(){
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
                let yPos = (Math.round(beta))/0.9+'%';
                $('body').stop().animate({
                    'background-position-x': xPos,
                    'background-position-y': yPos
                }, 3000, 'linear');
            }
        }, false);
    } else {
        console.log("no device support");
    }
}
