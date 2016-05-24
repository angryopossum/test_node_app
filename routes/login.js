/*
 * GET login page.
*/

exports.mustAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
};


exports.index = function(req, res){
  
        res.render('login', { 
            title: 'Login', 
            message: req.flash('message')
        });
};

exports.signup = function(req, res){
  
        res.render('signup', { 
            title: 'Sign up'
        });
};


exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};
