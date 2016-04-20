var assert = require('chai').assert;
var query = require("../lib/queries");
var test_query = require("../tmp/queries-examples");

var brands = ['Lamy', 'Pentel'];
var prices = ["_2","3_15","20_"];

var result =JSON.stringify(test_query.q);
var result2 =JSON.stringify(test_query.q2);
var result3 =JSON.stringify(test_query.q3);

//console.log(result3);
//console.log(JSON.stringify(query.makeQuery(null, prices)));

describe('makeQuery:', function() {
  
 describe('brands/null', function () {
    it('test gone', function () {
      assert.equal(JSON.stringify(query.makeQuery(brands, null)), result);
    });
  });
  
 describe('brands/prices', function () {
    it('test gone', function () {
      assert.equal(JSON.stringify(query.makeQuery(brands, prices)), result2);
    });
  });
  
 describe('null/prices', function () {
    it('test gone', function () {
      assert.equal(JSON.stringify(query.makeQuery(null, prices)), result3);
    });
  });
  
 
});
