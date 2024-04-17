const crypto = require('crypto');
const password ='crypto@123';
const cipher = crypto.createCipher('aes128', 'a password');
var encrypted = cipher.update(password, 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted,cipher);

const encrypt_password = '6ac2b3b08ce481c8016ee2067ba44081';
const decipher = crypto.createDecipher('aes128','a password');
var decrypted = decipher.update(encrypt_password,'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);


const hash = crypto.createHash('sha256');
hash.update('some data to hash');
console.log("createHash",hash.digest('hex'));



const buf = crypto.randomBytes(16);
console.log("randomBytes",buf.toString('hex'));