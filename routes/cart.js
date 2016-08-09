var Shoppingcart = require('../models/shoppingcart');
var Pen = require('../models/pens');
var mongoose = require('mongoose');

var async = require("async");

exports.index = function(req, res){
  
    function listCart(callback){
          Shoppingcart.find({userid: req.user._id}).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }
    
    
    async.series([
     listCart
    ],
    function(err, result){
        if (err) throw err;
    
    
       // console.log(result[0][1].code);
    
    
        res.render('cart/index', { 
            title: 'Shopping Cart', 
            cart: result[0]
        });
     
    });    

    /*
    res.render('cart/index', { 
            title: 'Shopping Cart', 
            cart: cart 
        });
     */
        
};



exports.add = function(req, res){
  
    
    var newCart = new Shoppingcart();
   
    newCart.qty = req.param('qty');
    newCart.userid = req.user._id;
    newCart.code = req.param('code');
    newCart.title = req.param('title');
    newCart.price = req.param('price');
    newCart.save(function (err) {
        if (err) {
                  console.log('Error in Saving cart: ' + err);
                  throw err;
                 }
                   console.log('Cart saving succesful');
                  });
                        




    res.json({user: 'tobi'});
        
};


exports.remove = function(req, res){
  
   console.log("SCII=" + req.param('cartitem'));
   
    async.series([
     deleteProductfromCart
    ],
    function(err, result){
        if (err) throw err;
         res.send('DELETE item from cart');
         
        /*
        res.render('cart/index', { 
            title: 'Shopping Cart /REMOVE', 
            cart: cart 
        });
        */
     
    });

  
  
     function deleteProductfromCart(callback){
         
         // var query = {"_id": {$in: req.param('cartitem').split(',')}};
          //console.log(query);
          
          //var cartitemM = [];
        
        
        /*
          var query = {};
          query['_id'] = {};
          query['_id'].$in = [];
        
          for (var i=0; i<req.param('cartitem').length; i++){ 
            query['_id'].$in[i] = req.param('cartitem')[i];
            // query['_id'].$in[i] = mongoose.Types.ObjectId(req.param('cartitem')[i]);
            //cartitemM[i] = "ObjectId(" + req.param('cartitem')[i] + ")";     
          }
          */
          
         
          //var query  = {_id : { $in: cartitemM }};
          
          
           
          // query['_id'].$in[0] = mongoose.Types.ObjectId("57a34a23c0ec1d7b2f6984ef");
          // query['_id'].$in[1] = mongoose.Types.ObjectId("57a34a24c0ec1d7b2f6984f2");
           
           
           //var query = {"_id":{ $in: [ObjectId("57a34a23c0ec1d7b2f6984ef"), ObjectId("57a34a24c0ec1d7b2f6984f2")]}};
       
           //console.log("query: "+ JSON.stringify(query));
          //var id = mongoose.Types.ObjectId("57a34a23c0ec1d7b2f6984ef");
          //console.log("ObjectId: " + id);
          
          Shoppingcart.findByIdAndRemove(req.param('id')).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
           
    }
    
   
     
        
};