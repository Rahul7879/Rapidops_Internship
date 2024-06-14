// const { expect } = require('chai');
// const { Given, When, Then, BeforeAll,Before, AfterAll } = require('@cucumber/cucumber');
// const sinon = require('sinon');
// const makeInviteRole = require('./invite-role');

// const RoleDBCalls = {
//   getUserByEmail: () => {},
//   updateAddedIn: () => {},
//   insertUser: () => {}
// };

// const sendMail = () => {};

// let getUserByEmailStub;
// let updateAddedInStub;
// let insertUserStub;
// let sendMailStub;

// BeforeAll(() => {
//   getUserByEmailStub = sinon.stub(RoleDBCalls, 'getUserByEmail');
//   updateAddedInStub = sinon.stub(RoleDBCalls, 'updateAddedIn');
//   insertUserStub = sinon.stub(RoleDBCalls, 'insertUser');
//   sendMailStub = sinon.stub(sendMail);
// });

// AfterAll(() => {
//   sinon.restore();
// });

// Given('email and roles: {string}', function (emailAndRoles) {
//   this.emailAndRoles = JSON.parse(emailAndRoles);
// });

// Given('requester email: {string}', function (email) {
//   this.requesterEmail = email;
// });

// When('try to invite role', async function () {
//   const inviteRoleUseCase = makeInviteRole(RoleDBCalls, sendMailStub);
//   const data = { emailAndRole: this.emailAndRoles };
//   const user = { email: this.requesterEmail };
//   try {
//     await inviteRoleUseCase(data, user);
//     this.result = 'Invitations sent successfully';
//   } catch (error) {
//     this.error = error;
//   }
// });

// Then('It should return a success message: {string}', function (message) {
//   expect(this.result).to.equal(message);
// });

// Then('It should return the error: {string}', function (error) {
//   expect(this.error.msg).to.equal(error);
// });

// Before(() => {
//   getUserByEmailStub.callsFake((email) => {
//     if (email === 'existing_user@example.com') {
//       return {
//         user_id: 'existing_user_id',
//         added_in: JSON.stringify(['tenant1'])
//       };
//     } else if (email === 'requester@example.com') {
//       return {
//         email: 'requester@example.com',
//         my_tenant: 'tenant1'
//       };
//     }
//     return null;
//   });

//   updateAddedInStub.callsFake((addedIn, userId) => {
//     expect(addedIn).to.include('tenant1');
//     expect(userId).to.equal('existing_user_id');
//   });

//   insertUserStub.callsFake((email, tenantId) => {
//     expect(tenantId).to.equal('tenant1');
//     return 'new_user_id';
//   });
  

//   sendMailStub.callsFake((email, userId, role_id) => {
//     expect(email).to.be.oneOf(['new_user@example.com', 'existing_user@example.com']);
//     expect(userId).to.be.oneOf(['new_user_id', 'existing_user_id']);
//     expect(role_id).to.be.oneOf(['role1', 'role2']);
//   });
// });
