var mongoose = require('mongoose');

module.exports = mongoose.model('Page',{
    id: String,
    title: String,
    content: String
});