var assert = require('chai').assert;
var paginator = require("../lib/pagination");

var total,
    numberPerPage, 
    page, 
    paginatorNumber, 
    url,
    symbol;

var paginatorResult, 
    test,
    result;

    total = 200;
    numberPerPage = 20;
    url = "";
    symbol = "?";

describe('Pagination - 10 (total: 200; items on page: 20; pagination_number: 5 ):', function() {
  
 describe('page: 1', function () {
    it('ok', function () {
        
      
      page = 1;
      paginatorNumber = 5;
     
      paginatorResult = {
               "prev": ["disable", ""],
               "0":["active", "?page=1", 1],
               "1":["normal", "?page=2", 2],
               "2":["normal", "?page=3", 3],
               "3":["normal", "?page=4", 4],
               "4":["normal", "?page=5", 5],
               "next":["active", "?page=6"]
              };
      
      test = JSON.stringify(paginator.pagination(total, numberPerPage, page, paginatorNumber, url, symbol));
      result = JSON.stringify(paginatorResult);
      
      assert.equal(test, result);
    });
  });
  
  describe('page: 2', function () {
    it('ok', function () {
        
      
      page = 2;
      paginatorNumber = 5;
     
      paginatorResult = {
               "prev": ["disable", ""],
               "0":["normal", "?page=1", 1],
               "1":["active", "?page=2", 2],
               "2":["normal", "?page=3", 3],
               "3":["normal", "?page=4", 4],
               "4":["normal", "?page=5", 5],
               "next":["active", "?page=6"]
              };
      
      test = JSON.stringify(paginator.pagination(total, numberPerPage, page, paginatorNumber, url, symbol));
      result = JSON.stringify( paginatorResult);
      
      assert.equal(test, result);
    });
  });
  
  describe('page: 7', function () {
    it('ok', function () {
        
      page = 7;
      paginatorNumber = 5;
      
      paginatorResult = {
               "prev": ["active", "?page=4"],
               "0":["normal", "?page=5", 5],
               "1":["normal", "?page=6", 6],
               "2":["active", "?page=7", 7],
               "3":["normal", "?page=8", 8],
               "4":["normal", "?page=9", 9],
               "next":["active", "?page=10"]
              };
      
      test = JSON.stringify(paginator.pagination(total, numberPerPage, page, paginatorNumber, url, symbol));
      result = JSON.stringify( paginatorResult);
      
      assert.equal(test, result);
    });
  });
 
  describe('page: 9', function () {
    it('ok', function () {
        
      page = 9;
      paginatorNumber = 5;
      
      paginatorResult = {
               "prev": ["active", "?page=5"],
               "0":["normal", "?page=6", 6],
               "1":["normal", "?page=7", 7],
               "2":["normal", "?page=8", 8],
               "3":["active", "?page=9", 9],
               "4":["normal", "?page=10", 10],
               "next":["disable", ""]
              };
      
      test = JSON.stringify(paginator.pagination(total, numberPerPage, page, paginatorNumber, url, symbol));
      result = JSON.stringify( paginatorResult);
      
      assert.equal(test, result);
    });
  });
 
 
 
 
 
  describe('page: 10', function () {
    it('ok', function () {
        
      page = 10;
      paginatorNumber = 5;
     
      paginatorResult = {
               "prev": ["active", "?page=5"],
               "0":["normal", "?page=6", 6],
               "1":["normal", "?page=7", 7],
               "2":["normal", "?page=8", 8],
               "3":["normal", "?page=9", 9],
               "4":["active", "?page=10", 10],
               "next":["disable", ""]
              };
      
      test = JSON.stringify(paginator.pagination(total, numberPerPage, page, paginatorNumber, url, symbol));
      result = JSON.stringify( paginatorResult);
      
      assert.equal(test, result);
    });
  });
  
});


describe('Pagination - 3 (total: 55; items on page: 20; pagination_number: 5):', function() {
  
 describe('page: 2', function () {
    it('ok', function () {
        
      total = 55;    
      page = 2;
      paginatorNumber = 5;
      url = "";
      symbol = "?";
      
      paginatorResult = {
               "prev": ["disable", ""],
               "0":["normal", "?page=1", 1],
               "1":["active", "?page=2", 2],
               "2":["normal", "?page=3", 3],
               "next":["disable", ""]
              };
      
      test = JSON.stringify(paginator.pagination(total, numberPerPage, page, paginatorNumber, url, symbol));
      result = JSON.stringify( paginatorResult);
      
      assert.equal(test, result);
    });
  });
  
});

describe('Pagination - 4 (total: 75; items on page: 20; pagination_number: 5):', function() {
  
 describe('page: 2', function () {
    it('ok', function () {
        
      total = 75;    
      page = 2;
      paginatorNumber = 5;
      url = "";
      symbol = "?";
      
      paginatorResult = {
               "prev": ["disable", ""],
               "0":["normal", "?page=1", 1],
               "1":["active", "?page=2", 2],
               "2":["normal", "?page=3", 3],
               "3":["normal", "?page=4", 4],
               "next":["disable", ""]
              };
      
      test = JSON.stringify(paginator.pagination(total, numberPerPage, page, paginatorNumber, url, symbol));
      result = JSON.stringify( paginatorResult);
      
      assert.equal(test, result);
    });
  });
  
});

describe('Pagination - 150 (total: 1500; items on page: 10; pagination_number: 5):', function() {
  
 describe('page: 17', function () {
    it('ok', function () {
        
      total = 1052; 
      page = 13;
      numberPerPage = 20;
      paginatorNumber = 5;
      url = "/";
      symbol = "?";
      
      paginatorResult = {
               "prev": ["active", "?page=10"],
                "0":["normal","/?page=11",11],
                "1":["normal","/?page=12",12],
                "2":["active","/?page=13",13],
                "3":["normal","/?page=14",14],
                "4":["normal","/?page=15",15],
                "next":["active", "?page=16"]
              };
      
      test = JSON.stringify(paginator.pagination(total, numberPerPage, page, paginatorNumber, url, symbol));
      result = JSON.stringify( paginatorResult);
      
      assert.equal(test, result);
    });
  });
  
});