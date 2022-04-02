
let crypto = require('crypto');
var uuidv4 = require('uuid').v4;


exports.hashing = () => {
    var hash = uuidv4();
    return hash;
}
