// const { expect } = require('chai');
// const { Given, When, Then, Before, BeforeAll, After, AfterAll } = require('@cucumber/cucumber');
// const sinon = require('sinon');
// const jwt = require('jsonwebtoken');
// const makeApproveTempRole = require('./temp-role-approval');
// const makeRequestTempRole = require('./temp-role-request');

// // Mock database and mailer modules
// const roleDBCalls = {
//   getTempUserId: sinon.stub(),
//   updateRoleWithTempUser: sinon.stub(),
// };
// const UserDBCalls = {
//   getTenantAdminEmail: sinon.stub(),
// };
// const mailer = {
//   sendMail: sinon.stub(),
// };

// Before(() => {
//   // Mock database and mailer function calls
//   roleDBCalls.getTempUserId.callsFake((tempUserEmail, tenantId) => {
//     if (tempUserEmail === 'tempuser@example.com' && tenantId === 'tenant123') {
//       return 'tempUserId123';
//     }
//     return null;
//   });

//   roleDBCalls.updateRoleWithTempUser.callsFake((tempUserId, tempUserExpiry, roleId, tenantId) => {
//     if (tempUserId === 'tempUserId123' && roleId === 'role1' && tenantId === 'tenant123') {
//       return;
//     }
//     throw new Error('Invalid parameters');
//   });

//   mailer.sendMail.callsFake((mailOptions) => {
//     if (mailOptions.to === 'tempuser@example.com' && mailOptions.subject === 'Temporary Role Approved') {
//       return;
//     }
//     throw new Error('Invalid mail options');
//   });

//   UserDBCalls.getTenantAdminEmail.callsFake((tenantId) => {
//     if (tenantId === 'tenant123') {
//       return 'admin@example.com';
//     }
//     return null;
//   });
// });

// After(() => {
//   sinon.resetHistory();
// });

// Given('token: {string} approve temporary role usecase', function (token) {
//   this.token = token;
// });

// When('try to approve the temporary role', async function () {
//   const jwtStub = sinon.stub(jwt, 'verify').callsFake((token, secret) => {
//     if (token === 'validToken') {
//       return {
//         userId: 'userId123',
//         tempUserEmail: 'tempuser@example.com',
//         roleId: 'role1',
//         tenantId: 'tenant123',
//         hours: 24,
//       };
//     } else {
//       throw new Error('Invalid token');
//     }
//   });

//   const approveTempRole = makeApproveTempRole(roleDBCalls, mailer, jwt);
//   try {
//     await approveTempRole(this.token);
//     this.result = 'Temporary role approved';
//   } catch (error) {
//     this.error = error;
//   }

//   jwtStub.restore();
// });

// Then('It should update the role and send an approval email to the user and return success message: {string}', function (result) {
//   expect(this.result).to.equal(result);
// });

// Then('It should return the error: {string} for temporary role approval', function (error) {
//   expect(this.error.message).to.equal(error.split(':')[1].trim());
// });

// Given('user data: {string}, {string}, {string}, {string}, {string}, {int} for temporary role request usecase', function (email, tenantId, userId, roleId, tempUserEmail, hours) {
//   this.email = email;
//   this.tenantId = tenantId;
//   this.userId = userId;
//   this.roleId = roleId;
//   this.tempUserEmail = tempUserEmail;
//   this.hours = hours;
// });

// When('try to request a temporary role temp', async function () {
//   const jwtStub = sinon.stub(jwt, 'sign').callsFake((payload, secret, options) => {
//     return 'validToken';
//   });

//   const requestTempRole = makeRequestTempRole(UserDBCalls, mailer, jwt);
//   try {
//     await requestTempRole({
//       email: this.email,
//       tenantId: this.tenantId,
//       userId: this.userId,
//       roleId: this.roleId,
//       tempUserEmail: this.tempUserEmail,
//       hours: this.hours,
//     });
//     this.result = 'Temporary role requested';
//   } catch (error) {
//     this.error = error;
//   }

//   jwtStub.restore();
// });

// Then('It should send a request email to the admin and return success message: {string}', function (result) {
//   expect(this.result).to.equal(result);
// });

// Then('It should return the error: {string} for temporary role request temp', function (error) {
//   expect(this.error.message).to.equal(error.split(':')[1].trim());
// });
