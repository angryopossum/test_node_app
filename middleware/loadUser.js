var User = require('../models/users');

module.exports = function(req, res, next) {
   
   
    req.user = res.locals.user = null;
  
      if (typeof(req.session.passport) == "undefined") {
         console.log("req is undefined! "+ req.user);
         next();
         
       } else {
         console.log("req is completly defined!" + JSON.stringify(req.session));
         
         if (!req.session.passport.user) return next();

         User.findById(req.session.passport.user, function(err, user) {
         if (err) return next(err);

          req.user = res.locals.user = user;
          console.log(user);
          next();
       });
    
       }
  
  
  
  
   //if (typeof(req) == "undefined") {
   
    
   
   //}
   
   
       
      /* 
  var user = req.user;
   console.log(typeof(user));
  // user = req.user;
 //  console.log("Sessionid: " + req.session.id);
   //console.log("SessionUser: " + req.session.passport.user);
   //console.log("UserId: " + req.user._id);
   next();
   */
   
};