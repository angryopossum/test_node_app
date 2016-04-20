//var assert = require('assert');
var assert = require('chai').assert;
var queries = require("../lib/queries");


function helloName (name){
  console.log(name);
  return name;
}


var name = "Вася";

before (function(){console.log("Test begin:");} );

describe('Greeting!', function() {
  describe('Hello Name', function () {
    it('Your name is Вася', function () {
      assert.equal(name, 'Вася');
    });
  });
  
describe('Test async code', function () {
    it('Your name is not Вася', function (done) {
      assert.notEqual(queries.makeQuery("Вася1"), 'Вася');
      done();
    });
  });
});



