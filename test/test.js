const assert = require('chai').assert;
const sayHello = require('../app').sayHello;
// const app = require

describe('APP', function() {
   it('app should return hello', function(){
       let result = sayHello();
       assert.equal(result,'hello')
   })
});
