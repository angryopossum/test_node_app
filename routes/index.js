var query = require("../lib/queries");
var pagination = require("../lib/pagination");
var Pen = require('../models/pens');
var async = require("async");
var winston = require("winston");
/*
 * GET home page.
 */

exports.index = function(req, res){
    
    var brand_check,
        category_check,
        price_check;
    
    var prices = [
        '_2',
        '2_5',
        '5_10',
        '10_50',
        '50_'
        ];
    
    if(req.param('brand')){ brand_check = req.param('brand')} else {brand_check =[]}
    if(req.param('category')){category_check = req.param('category')} else {category_check =[]}
    if(req.param('price')){price_check = req.param('price')} else {price_check =[]}
    
    if(req.query.page){var currentPage = req.query.page } else {currentPage = 1}

    if(req.query.price || req.query.brand || req.query.category){
        var queryForPens = query.makeQuery(req.query.brand, req.query.price, req.query.category);
        var symbol = "&";
    } else {
       queryForPens  = null;
       symbol = "?";
    }
    
    if(req.param('search')){
        
        var search = req.param('search');
        var st = new RegExp(search, 'i');
        var queryForPens = {title: st};
        symbol = "&";
    } 
    
    
    
    
    var paginatorNumber = 5;
    var numberPerPage = 20;
    var skipCounter = (currentPage-1)*numberPerPage;
    
    //console.log(queryForPens);

    
    async.series([
     getBrands,
     listProducts,
     listProductsCount,
     getCategories
    ],
    function(err, result){
        if (err) throw err;
        
        var link = req.originalUrl.replace(/&page=[0-9]*/, "").replace(/\?page=[0-9]*/, "");
        var total = result[2];
        var paginator = pagination.pagination (total, numberPerPage, currentPage, paginatorNumber, link, symbol);
        
        res.render('index', { 
            title: 'Express', 
            brands: result[0], 
            products: result[1],
            categories: result[3],
            paginator: paginator,
            brand_check: brand_check,
            category_check: category_check,
            price_check: price_check,
            prices: prices
        });
     
    });

    
    function getBrands(callback){
        
      var queryBrands =  [{ $group: {_id: "$brand"}}];
    
      Pen.aggregate(queryBrands).exec(
           function (err, result) {
             if(err) throw err;
             callback(null, result);
        });
    }
    
    function listProducts(callback){
          Pen.find(queryForPens).limit(numberPerPage).skip(skipCounter).sort({"price": -1}).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }
    
    function listProductsCount(callback){
          Pen.find(queryForPens).count().exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }
    
    function getCategories(callback){
        
     var queryCategories =  [{ $group: {_id: "$category"}}];
    
      Pen.aggregate(queryCategories).exec(
           function (err, result) {
             if(err) throw err;
             callback(null, result);
        });
    }
    
};



exports.livesearch = function(req, res){
    
    var search = req.param('search');
    var st = new RegExp(search, 'i');
    var query = {title: st};
  
    async.series([
     searchProduct
    ],
    function(err, result){
        if (err) throw err;
        
        res.json(result[0]);
     
    });

   function searchProduct (callback) {

     Pen.find(query).limit(5).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }
   
    
};
