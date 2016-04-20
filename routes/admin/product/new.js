var query = require("../../../lib/queries");
var Pen = require('../../../models/pens');
var async = require("async");

/*
 * GET edit page.
 */

exports.new = function(req, res){
    
    async.series([
     getBrands,
     getCategories
    ],
    function(err, result){
        if (err) throw err;
        
        
        res.render('admin/product/new', { 
            title: 'New product',
            brands: result[0],
            categories: result[1]
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
    
    function getCategories(callback){
        
      var queryCategories =  [{ $group: {_id: "$category"}}];
    
      Pen.aggregate(queryCategories).exec(
           function (err, result) {
             if(err) throw err;
             callback(null, result);
        });
    }
    
   
};

exports.create = function(req, res){
    
    async.series([
     createProduct
    ],
    function(err, result){
        if (err) throw err;
        
        
        res.send('New product created!');
     
    });

    
    function createProduct(callback){
        
      var product = new Pen({
                       title: req.param('title'), 
                       price: req.param('price'), 
                       description: req.param('description'),
                       brand: req.param('brand'),
                       category: req.param('category'),
                       code: req.param('code')
              
      });
    
      product.save(
           function (err, result) {
             if(err) throw err;
             callback(null, result);
        });
    }
    
};



