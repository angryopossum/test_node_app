var assert = require('chai').assert;
var query = require("../lib/queries");
var test_query = require("../tmp/queries-examples");

var brands = ['Lamy', 'Pentel'];
var prices = ["_2","3_15","20_"];
var categories = ["drawing-pens","ballpoint-pens"];

var result =JSON.stringify(test_query.q);
var result1 =JSON.stringify(test_query.q1);
var result2 =JSON.stringify(test_query.q2);
var result3 =JSON.stringify(test_query.q3);
var result4 =JSON.stringify(test_query.q4);
var result5 =JSON.stringify(test_query.q5);
var result6 =JSON.stringify(test_query.q6);
var result7 =JSON.stringify(test_query.q7);
var result8 =JSON.stringify(test_query.q8);

//console.log(result3);
//console.log(JSON.stringify(query.makeQuery(null, prices)));

describe('makeQuery:', function() {
  
 describe('null/null/categories', function () {
    it('test gone', function () {
      assert.equal(JSON.stringify(query.makeQuery(null, null, categories)), result1);
    });
  });
  
 describe('null/prices/null', function () {
    it('test gone', function () {
      assert.equal(JSON.stringify(query.makeQuery(null, prices, null)), result2);
    });
  });
  
 describe('null/prices/categories', function () {
    it('test gone', function () {
      assert.equal(JSON.stringify(query.makeQuery(null, prices, categories)), result3);
    });
  });
  
 describe('brands/null/null', function () {
    it('test gone', function () {
      assert.equal(JSON.stringify(query.makeQuery(brands, null, null)), result4);
    });
  });
  
  describe('brands/null/categories', function () {
    it('test gone', function () {
      assert.equal(JSON.stringify(query.makeQuery(brands, null, categories)), result5);
    });
  });
  
  describe('brands/prices/null', function () {
    it('test gone', function () {
      assert.equal(JSON.stringify(query.makeQuery(brands, prices, null)), result6);
    });
  });
 
  describe('brands/prices/categories', function () {
    it('test gone', function () {
      assert.equal(JSON.stringify(query.makeQuery(brands, prices, categories)), result7);
    });
  });
 
  describe('null/null/null', function () {
    it('test gone', function () {
      assert.equal(JSON.stringify(query.makeQuery(null, null, null)), result8);
    });
  });
 
 
 
});


var brand = 'Lamy';
var price = '2_5';
var category = "drawing-pens";


var res1 =JSON.stringify(test_query.sq1);

describe('makeQuery: single data case', function() {
  
 describe('null/null/category', function () {
    it('test gone', function () {
      assert.equal(JSON.stringify(query.makeQuery(null, null, category)), res1);
    });
  });
  
 
});