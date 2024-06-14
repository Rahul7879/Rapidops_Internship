// const { Before, BeforeAll, Given,After, AfterAll, When, Then } = require('@cucumber/cucumber');
// const { expect } = require('chai');
// const sinon = require('sinon');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const makeResetPassword = require('./reset-password');

// // Mock dependencies
// const UserDBCallsMock = {
//   updateUserPassword: sinon.stub().resolves()
// };

// const SECRET_KEY = 'your_secret_key';

// // Initialize stubs
// const sandbox = sinon.createSandbox();

// // Stubbing JWT verify function
// sandbox.stub(jwt, 'verify').callsFake((token, secretOrPublicKey, callback) => {
//   if (token === 'valid_token') {
//     callback(null, { email: 'user@example.com' });
//   } else {
//     callback(new Error('Invalid token'));
//   }
// });

// // Stubbing bcrypt functions
// sandbox.stub(bcrypt, 'genSalt').resolves('salt');
// sandbox.stub(bcrypt, 'hash').resolves('hashed_password');

// // Create resetPassword function with mocked dependencies
// let resetPassword = makeResetPassword(UserDBCallsMock, bcrypt, jwt, SECRET_KEY);

// let result;
// let error;

// BeforeAll(() => {
//   // Perform setup tasks that should run once before all scenarios
//   console.log('Before all scenarios setup');
// });

// Before(() => {
//   // Reset state or setup tasks that should run before each scenario
//   result = undefined;
//   error = undefined;
//   console.log('Before each scenario setup');
// });

// Given('a valid token {string} and new password {string}', function (token, newPassword) {
//   this.token = token;
//   this.newPassword = newPassword;
// });

// Given('an invalid token {string} and new password {string}', function (token, newPassword) {
//   this.token = token;
//   this.newPassword = newPassword;
// });

// When('resetPassword function is called', async function () {
//   try {
//     result = await resetPassword(this.token, this.newPassword);
//   } catch (err) {
//     error = err;
//   }
// });

// Then('it should return status {int} and message {string}', function (status, message) {
//   expect(result).to.deep.equal({ status, msg: message });
// });

// Then('it should throw an error with status {int} and message {string}', function (status, message) {
//   expect(error).to.not.be.undefined;
//   expect(error.status).to.equal(status);
//   expect(error.msg).to.equal(message);
// });

// // Clean up after scenarios
// After(() => {
//   sandbox.reset();
// });

// AfterAll(() => {
//   sandbox.restore();
// });
