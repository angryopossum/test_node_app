//var query = require("../lib/queries");
var Pen = require('../models/pens');
var async = require("async");

 /*
 * Search page.
 */

exports.index = function(req, res){
    
    var search = req.param('search');
    var st = new RegExp(search, 'i');
    var query = {title: st};
    
    
    if(req.param('search')!==""){
      console.log(req.param('search'));  
    } 
    else {
      console.log("Null is null!");
    }
  
    async.series([
     searchProduct
    ],
    function(err, result){
        if (err) throw err;
        
        res.render('search', { 
            title: 'Express',
            result: search,
            product: result[0]
        });
     
    });

   function searchProduct (callback) {

     Pen.find(query).exec(
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
    
    
    if(req.param('search')!==""){
      console.log("This is livesearch request: " + req.param('search'));  
    } 
    else {
      console.log("Null is null!");
    }
  
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
