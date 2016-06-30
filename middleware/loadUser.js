var User = require('../models/users');

module.exports = function(req, res, next) {
   /*
    req.user = res.locals.user = null;
  
   if (typeof(req) == "undefined") {
   
    if (!req.session.passport.user) return next();

    User.findById(req.session.passport.user, function(err, user) {
      if (err) return next(err);

      req.user = res.locals.user = user;
      // console.log(user);
      next();
    });
    
   }
   */
   user = req.user;
   next();
   
};