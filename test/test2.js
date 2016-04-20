var assert = require('assert');

function helloName (name){
  console.log(name);
  return name;
}


describe('Greeting!', function() {
  describe('Hello Name', function () {
    it('print your name in console', function () {
      assert.equal(helloName('Вася'), 'Вася');
    });
    it('Your name is Коля', function () {
      assert.equal(helloName('Коля'), 'Вася');
    });
  });
});