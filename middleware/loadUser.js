var User = require('../models/users');

module.exports = function(req, res, next) {
   
    req.session.auser = "true";
   
    req.user = res.locals.user = null;
  
      if (typeof(req.session.passport) == "undefined") {
          next();
       } else {
       
         if (!req.session.passport.user) return next();
         
         User.findById(req.session.passport.user, function(err, user) {
         if (err) return next(err);

          req.user = res.locals.user = user;
           req.session.auser = "false";
          next();
       });
    
       }
  
  
  

   
};