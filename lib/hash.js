
let crypto = require('crypto');

exports.hashing = (arg) => {
    data = 'Salt293' + arg.toString();
   // arg.forEach(element => {
   //     data=data+element.toString()        
   //})
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    return hash;
}