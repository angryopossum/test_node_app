var bCrypt = require('bcrypt-nodejs');

// Generates hash using bCrypt
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

exports.createHash = createHash;