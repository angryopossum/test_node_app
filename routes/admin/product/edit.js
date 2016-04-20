var query = require("../../../lib/queries");
var Pen = require('../../../models/pens');
var async = require("async");

/*
 * GET edit page.
 */

exports.edit = function(req, res){
    
    var query = {code: req.params.product};
    
    async.series([
     getProduct, 
     getBrands,
     getCategories
    ],
    function(err, result){
        if (err) throw err;
        
        
        res.render('admin/product/edit', { 
            title: 'Edit page',
            product: result[0],
            brands: result[1],
            categories: result[2]
        });
     
    });

     
    function getProduct(callback){
          Pen.find(query).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }

    
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


exports.update = function(req, res){
    
    var query = {code: req.params.product};
    
    console.log(req.param('price'));
    
    async.series([
     updateProduct,
     getProduct, 
     getBrands,
     getCategories
    ],
    function(err, result){
        if (err) throw err;
        
        
        res.render('admin/product/edit', { 
            title: 'Edit page',
            product: result[1],
            brands: result[2],
            categories: result[3]
        });
        
     
    });

     
    function updateProduct(callback){
         
          var query = {code: req.params.product };
          var query_set = {
                            title: req.param('title'), 
                            price: req.param('price'), 
                            description: req.param('description'),
                            brand: req.param('brand'),
                            category: req.param('category'),
                            code: req.param('code')
              
          };
         
          Pen.update(query, query_set).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }

    function getProduct(callback){
          Pen.find(query).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }

    
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


exports.delete = function(req, res){
    
    async.series([
     deleteProduct
    ],
    function(err, result){
        if (err) throw err;
        
        
        res.send('DELETE request to homepage');
        
     
    });

     
    function deleteProduct(callback){
         
          var query = {code: req.params.product };
          
          Pen.remove(query).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }
   
   
};



