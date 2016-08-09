var mongoose = require('mongoose');

module.exports = mongoose.model('Shoppingcart',{
    id: String,
    userid: String,
    code: String,
    title: String,
    price: String,
    qty: String
});