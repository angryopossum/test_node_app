var User = require('../../../models/users');
var async = require("async");
var crypto = require('../../../lib/crypto');

exports.edit = function(req, res){
    
    var query = {username: req.params.username};
    
    async.series([
     getUser
    ],
    function(err, result){
        if (err) throw err;
        
        res.render('admin/user/edit', { 
            title: 'Edit page',
            user: result[0]
        });
     
    });

     
    function getUser(callback){
          User.find(query).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }

};


exports.update = function(req, res){
    
    var query = {username: req.params.username};
    
    
    async.series([
     updateUser,
     getUser
    ],
    function(err, result){
        if (err) throw err;
        
        
        res.render('admin/user/edit', { 
            title: 'Edit page',
            user: result[1]
        });
        
     
    });

     
    function updateUser(callback){
         
          var query = {username: req.params.username};
          var query_set = {
                            email: req.param('email'),
                            password: crypto.createHash(req.param('password'))
          };
         
          User.update(query, query_set).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }

    function getUser(callback){
          User.find(query).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }
   
};



exports.delete = function(req, res){
    
    async.series([
     deleteUser
    ],
    function(err, result){
        if (err) throw err;
        
        
        res.send('DELETE request to homepage');
        
     
    });

     
    function deleteUser(callback){
         
          var query = {username: req.params.username};
          
          User.remove(query).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }
   
   
};