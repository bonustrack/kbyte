const crypto = require('crypto');

const password = 'a password';
const data = 'some clear text data';

const cipher = crypto.createCipher('aes192', password);
let encrypted = cipher.update(data, 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('Encrypted', encrypted);

const decipher = crypto.createDecipher('aes192', password);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('Decrypted', decrypted);
