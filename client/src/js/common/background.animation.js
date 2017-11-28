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

            if(!gamma||!beta){
                // PC
                $('body').stop().animate({
                    'background-position-x': '50%',
                    'background-position-y': '0%'
                }, 3000, 'linear');

                return 0;
            }

            let flag = false;

            if(gamma > preGamma+5||gamma < preGamma-5){
                preGamma = gamma;
                flag = true;
            }

            if(beta > preBeta+2||beta < preBeta-2 ){
                preBeta = beta;
                flag = true;
            }

            // create only when changes
            if(flag){
                let xPos = (Math.round(gamma)+90)/1.8;
                let yPos = (Math.round(beta)+180)/3.6;
                // console.info('math',xPos,yPos);

                if(yPos>100){
                    yPos = 100
                }

                // console.log(xPos,yPos);

                $('body').stop().animate({
                    'background-position-x': xPos+'%',
                    'background-position-y': yPos+'%'
                }, 3000, 'linear');
            }
        }, false);
    } else {
        console.log("no device support");
    }
}
