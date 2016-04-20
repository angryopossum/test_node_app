//var query = require("../lib/queries");
var Pen = require('../models/pens');
var async = require("async");
/*
 * GET home page.
 */

exports.index = function(req, res){
    
   var query = {code: req.params.product};

    
    async.parallel([
     getProduct
    ],
    function(err, result){
        if (err) throw err;
    
        res.render('product', { 
            title: 'Product info '+req.params.product, 
            product: result[0]
        });
     
    });

    
    function getProduct(callback){
          Pen.find(query).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }
    
};

