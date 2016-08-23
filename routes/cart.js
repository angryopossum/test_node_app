var Shoppingcart = require('../models/shoppingcart');
var Pen = require('../models/pens');
var mongoose = require('mongoose');
var uniqueid = require('../lib/uniqueid');

var async = require("async");

exports.index = function(req, res){
  
  
    
    function listCart(callback){
        
         if (req.session.auser == "true"){
             
             //console.log("IT's true: " + req.session.cart.length);
             if (typeof(req.session.cart) == "undefined"){
                 var result = [];
                  callback(null,  result);
             } else {
                 callback(null, req.session.cart); 
             }
           
            
             
         } else {
             console.log("IT's absolutly false");
             Shoppingcart.find({userid: req.user._id}).exec(
                function (err, result) {
                   if(err) throw err;
                   callback(null, result);
             });
     
         }
        
        
        
          
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
  
    console.log(typeof(req.session.passport));
    console.log(JSON.stringify(req.session));
  
    
   
    
    if (typeof(req.session.passport) != "undefined"){
     
     if (req.session.passport.user) {
     
       Shoppingcart.findOne({code: req.param('code')}).exec(
          function (err, result) {
            if(err) throw err;
            if (result == null){
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
                    
                } else {
                   result.qty = result.qty + parseInt(req.param('qty')); 
                   result.save();
                }
                  
           });
    
     
     } else {
        
        if ( typeof(req.session.cart) == "undefined") {
         console.log("Такого нету");
         req.session.cart = [];
         req.session.cart[0] = {};
         req.session.cart[0]._id = uniqueid.uniqueid();
         req.session.cart[0].qty = req.param('qty');
         req.session.cart[0].title = req.param('title');
         req.session.cart[0].code = req.param('code');
         req.session.cart[0].price = req.param('price');
     } else {
         console.log("Такой есть");
         var counter =  req.session.cart.length;
         req.session.cart[counter] = {};
         req.session.cart[counter]._id = uniqueid.uniqueid();
         req.session.cart[counter].qty = req.param('qty');
         req.session.cart[counter].code = req.param('code');
         req.session.cart[counter].title = req.param('title');
         req.session.cart[counter].price = req.param('price');
     }
         
         
     }
                   
                   
    } else {
     
     if ( typeof(req.session.cart) == "undefined") {
         console.log("Такого нету");
         req.session.cart = [];
         req.session.cart[0] = {};
         req.session.cart[0]._id = uniqueid.uniqueid();
         req.session.cart[0].qty = req.param('qty');
         req.session.cart[0].title = req.param('title');
         req.session.cart[0].code = req.param('code');
         req.session.cart[0].price = req.param('price');
     } else {
         console.log("Такой есть");
         var counter =  req.session.cart.length;
         req.session.cart[counter] = {};
         req.session.cart[counter]._id = uniqueid.uniqueid();
         req.session.cart[counter].qty = req.param('qty');
         req.session.cart[counter].code = req.param('code');
         req.session.cart[counter].title = req.param('title');
         req.session.cart[counter].price = req.param('price');
     
     }
     
    
     console.log(JSON.stringify(req.session));
        
    }
    

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
          
          
          
          if(req.param('id').length == 32){
              console.log("This is 32-bit case");
              for (var i = 0; i < req.session.cart.length; i++) {
                  if (req.session.cart[i]._id == req.param('id')) {
                      console.log("Delete"+req.session.cart[i]._id);
                      req.session.cart.splice(i,1);
                  }
              }
              var result = req.session.cart;
              callback(null, result);
          }
          if(req.param('id').length == 24){
              console.log("This is 24-bit case");
                 Shoppingcart.findByIdAndRemove(req.param('id')).exec(
                  function (err, result) {
                  if(err) throw err;
                  callback(null, result);
           });
          }
          
          
          
          
       
           
    }
    
   
     
        
};