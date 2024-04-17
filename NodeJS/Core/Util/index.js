var util = require('util');


var txt = 'Congratulate %s on his %dth birthday %s %d !';
var result = util.format(txt, 'Linus', 6,"hello","rahul");

function callbackFunction(arg1, arg2, callback) {
    // Asynchronous operation
    // Invoke callback with error (if any) and result
  }
  
  // Promisify callbackFunction
  const callbackFunctionPromise = util.promisify(callbackFunction);
  
  // Promisified version
  callbackFunctionPromise(arg1, arg2)
    .then((result) => {
      // Process result
    })
    .catch((error) => {
      // Handle error
    });

console.log(result);