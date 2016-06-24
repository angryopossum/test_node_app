var User = require('../../../models/users');
var async = require("async");
var crypto = require('../../../lib/crypto');

/*
 * GET edit page.
 */

exports.new = function(req, res){
    
        res.render('admin/user/new', { 
            title: 'New product',
        });
     
};

exports.create = function(req, res){
    
    async.series([
     createUser
    ],
    function(err, result){
        if (err) throw err;
        
        
        res.send('New user created!');
     
    });

    
    function createUser(callback){
        
      var user = new User({
                       username: req.param('username'), 
                       password: crypto.createHash(req.param('password')), 
                       email: req.param('email'),
                       group: req.param('group')
    
      });
    
     user.save(
           function (err, result) {
             if(err) throw err;
             callback(null, result);
        });
    }
    
};



