const dns = require('dns');
const url = 'www.google.com';

module.exports = function checkInternet() {
    return new Promise((resolve, reject) => {
        dns.lookup(url, (err) => {
            if (err && err.code === 'ENOTFOUND') reject(err);
            else resolve(true);
        });
    });
};
