function generateOTP() {
    var code = '';
    var possible = '0123456789';
    var crypto = require('crypto');
    for (var i = 0; i < 4; i++) {
        code += possible.charAt(crypto.randomBytes(1)[0] % possible.length);
    }
    return code;
}

module.exports = generateOTP;
