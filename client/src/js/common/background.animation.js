/**
 * Created by shenlin on 02/11/2017.
 */
import $ from 'jquery';

export function thresholdCheck(gamma, preGamma, beta, preBeta) {
  let [flag, tempGamma, tempBeta] = [false, preGamma, preBeta];

  if (gamma > preGamma + 5 || gamma < preGamma - 5) {
    tempGamma = gamma;
    flag = true;
  }

  if (beta > preBeta + 2 || beta < preBeta - 2) {
    tempBeta = beta;
    flag = true;
  }
  return [flag, tempGamma, tempBeta];
}

export function angleNormalise(gamma, beta) {
  const xPos = (Math.round(gamma) + 90) / 1.8;
  let yPos = (Math.round(beta) + 180) / 3.6;
  if (yPos > 100) {
    yPos = 100;
  }
  return [xPos, yPos];
}


export default function backgroundAnimation() {
  if (window.DeviceOrientationEvent) {
    let preGamma = 0;
    let preBeta = 90;
    let flag = false;

    window.addEventListener('deviceorientation', (event) => {
      const [gamma, beta] = [event.gamma, event.beta];

      if (!gamma || !beta) {
        // PC
        $('body').stop().animate({
          'background-position-x': '50%',
          'background-position-y': '0%',
        }, 3000, 'linear');
        return 0;
      }

      [flag, preGamma, preBeta] = thresholdCheck(gamma, preGamma, beta, preBeta);

      if (flag) {
        const [xPos, yPos] = angleNormalise(gamma, beta);
        $('body').stop().animate({
          'background-position-x': `${xPos}%`,
          'background-position-y': `${yPos}%`,
        }, 3000, 'linear');return 0;
      }
      return 0;
    }, false);
  } else {
    console.log('no device support');
  }
}
