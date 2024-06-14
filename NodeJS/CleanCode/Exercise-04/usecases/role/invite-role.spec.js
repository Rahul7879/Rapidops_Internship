const { expect } = require('chai');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const sinon = require('sinon');
const makeInviteRole = require('./invite-role');

const RoleDBCalls = {
  getUserByEmail: () => { },
  updateAddedIn: () => { },
  insertUser: () => { }
};

const sendMail = () => { };

let getUserByEmailStub;
let updateAddedInStub;
let insertUserStub;
let sendMailStub;

Before(() => {
  getUserByEmailStub = sinon.stub(RoleDBCalls, 'getUserByEmail');
  updateAddedInStub = sinon.stub(RoleDBCalls, 'updateAddedIn');
  insertUserStub = sinon.stub(RoleDBCalls, 'insertUser');
  sendMailStub = sinon.stub();

  getUserByEmailStub.callsFake(async (email) => {
    if (email === 'admin@example.com') {
      return { email: 'admin@example.com', my_tenant: 'tenant-123' };
    } else if (email === 'user1@example.com' || email === 'user2@example.com') {
      return { email, user_id: `${email.split('@')[0]}-id`, added_in: '["tenant-123"]' };
    } else {
      return null;
    }
  });

  updateAddedInStub.callsFake(async (addedIn, userId) => { });

  insertUserStub.callsFake(async (email, tenantId) => `${email.split('@')[0]}-id`);

  sendMailStub.callsFake(async (email, userId, role_id) => { });
});

After(() => {
  sinon.restore();
});

Given('data with emailAndRole: {string} and user email: {string}', function (emailAndRole, userEmail) {
  this.data = { emailAndRole: JSON.parse(emailAndRole) };
  this.user = { email: userEmail };
});

When('try to invite roles', async function () {
  const inviteRole = makeInviteRole(RoleDBCalls, sendMail);
  try {
    await inviteRole(this.data, this.user);
    this.result = "Success";
  } catch (error) {
    this.error = error;
  }
});

Then('It should send emails to the specified users', function () {
  expect(this.result).to.equal("Success");
});

Then('It should return the error: {string}', function (error) {
  const [errorMsg, errorCode] = error.split(' (');
  const statusCode = parseInt(errorCode.replace(')', ''), 10);
  expect(this.error.msg).to.equal(errorMsg);
  expect(this.error.status).to.equal(statusCode);
});
