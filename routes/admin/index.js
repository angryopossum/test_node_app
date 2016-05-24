var query = require("../../lib/queries");
var pagination = require("../../lib/pagination");
var Pen = require('../../models/pens');
var async = require("async");
var winston = require("winston");

/*
 * GET admin index page.
 */
 

exports.index = function(req, res){
  
    if(req.query.price){var price = req.query.price } else {var price = [] }
    if(req.query.brand){var brand_req = req.query.brand } else {var brand_req = [] }
    if(req.query.page){var currentPage = req.query.page } else {currentPage = 1}

    if(req.query.price || req.query.brand){
      var queryForPens = query.makeQuery (req.query.brand, req.query.price);
        var symbol = "&";
    } else {
       queryForPens  = null;
       symbol = "?";
    }
    
    
    var paginatorNumber = 5;
    var numberPerPage = 20;
    var skipCounter = (currentPage-1)*numberPerPage;
    
    console.log(req.isAuthenticated());
     console.log(req.user.username);
    
    async.series([
     getBrands,
     listProducts,
     listProductsCount
    ],
    function(err, result){
        if (err) throw err;
        
        var link = req.originalUrl.replace(/&page=[0-9]*/, "").replace(/\?page=[0-9]*/, "");
        var total = result[2];
        var paginator = pagination.pagination (total, numberPerPage, currentPage, paginatorNumber, link, symbol);
        
        res.render('admin', { 
            title: 'Express', 
            brands: result[0], 
            products: result[1],
            paginator: paginator,
            username: req.user.username
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
          Pen.find(query).limit(numberPerPage).skip(skipCounter).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }
    
    function listProductsCount(callback){
          Pen.find(query).count().exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }
    
};