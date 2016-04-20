var mongoose = require('mongoose');

module.exports = mongoose.model('Pen',{
    id: String,
    brand: String,
    title: String,
    code: String,
    description: String,
    price: Number,
    category: String
});