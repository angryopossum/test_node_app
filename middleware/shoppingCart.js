var Shoppingcart = require('../models/shoppingcart');

module.exports = function(req, res, next) {
   
   /*
   ses = req.session;
  // ses.view = ses.view + 1;
   if (req.param('brand')) {
   ses.test = ses.test + req.param('brand');
   }
  
   if (!req.session.passport.user) return next();

    Shoppingcart.findById(req.session.passport.user, function(err, user) {
      if (err) return next(err);

      req.user = res.locals.user = user;
      console.log(user);
      next();
    });
    
   */
   
   /*
   var newCart = new Shoppingcart();
   
    newCart.qty = 5;
    newCart.userid = "576cfa295e727f941b0927de" ;
    newCart.code = "PP05623" ;
    newCart.save(function (err) {
                            if (err) {
                                console.log('Error in Saving cart: ' + err);
                                throw err;
                            }
                            console.log('Cart saving succesful');
                        });
                        
    */
    /*
   Shoppingcart.find({userid: "576cfa295e727f941b0927de"}, function(err, cart) {
      if (err) return next(err);

      console.log(cart);
      next();
    });
   
   */
   console.log(req.user);
   
   next();
   
};