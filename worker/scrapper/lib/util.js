const crypto = require('crypto');

const genKey = (input) => {
  return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex') // Sha1
}

exports.genKey = genKey