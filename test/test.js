const assert = require('chai').assert;
const backgroundAnimation = require('../client/src/js/common/background.animation');

// const app = require

describe('BackgroundAnimation', function() {
   let thresholdCheck = backgroundAnimation.thresholdCheck;
   let angleNormalise = backgroundAnimation.angleNormalise;

   it('should update alpha gram when threshold is reached', function(){
       assert.deepEqual([true,10,10],thresholdCheck(10,20,10,10));
       assert.deepEqual([true,10,10],thresholdCheck(10,10,10,14));
       assert.deepEqual([true,10,10],thresholdCheck(10,20,10,14));
   });

   it('should not update alpha gram when threshold is reached', function(){
     assert.deepEqual([false,14,10],thresholdCheck(10,14,10,10));
     assert.deepEqual([false,10,12],thresholdCheck(10,10,10,12));
     assert.deepEqual([false,14,12],thresholdCheck(10,14,10,12));
   })
});
