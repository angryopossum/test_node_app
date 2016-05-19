
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , search = require('./routes/search')
  , product = require('./routes/product')
  , admin = require('./routes/admin')
  , products = require('./routes/admin/product')
  , product_edit = require('./routes/admin/product/edit')
  , product_new = require('./routes/admin/product/new')
  , mongoose = require('./lib/mongoose')
  , config = require('./config') 
  , http = require('http')
  , path = require('path');
 

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/', routes.livesearch);
app.get('/product/:product', product.index);

app.get('/admin', admin.index);
app.get('/admin/products', products.index);
app.get('/admin/product/:product', product_edit.edit);
app.post('/admin/product/:product', product_edit.update);
app.get('/admin/product/:product/delete', product_edit.delete);
app.get('/admin/products/new', product_new.new);
app.post('/admin/products/new', product_new.create);

//app.get('/admin/pages', pages.index);

app.get('/search', search.index);
app.post('/search', search.livesearch);
app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
