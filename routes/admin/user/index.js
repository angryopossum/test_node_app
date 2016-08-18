
/*
 * GET users listing.
 */

var query = require("../../../lib/queries");
var pagination = require("../../../lib/pagination");
var User = require('../../../models/users');
var async = require("async");

/*
 * GET home page.
 */

exports.index = function(req, res){
    
    //console.log(req.session);
    
    
    async.series([
     listUsers,
     listUsersCount
    ],
    function(err, result){
        if (err) throw err;
        
       
        res.render('admin/user', { 
            title: 'Admin page for users', 
            users: result[0],
            count: result[1]
        });
     
    });

    
    
    function listUsers(callback){
          User.find(query).exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }
    
    function listUsersCount(callback){
          User.find(query).count().exec(
            function (err, result) {
             if(err) throw err;
             callback(null, result);
           });
    }
    
};
