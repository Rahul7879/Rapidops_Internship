const { expect } = require('chai');
const { Given, When, Then, Before, BeforeAll, After, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandBox = sinon.createSandbox();
const makeRequestTempRole = require('./temp-role-request');
const jwt = require('jsonwebtoken');

const UserDBCalls = {
  getTenantAdminEmail: () => { }
};
const mailer = {
  sendMail: () => { }
};

let getTenantAdminEmailStub;
let sendMailStub;
let signStub;

BeforeAll(() => {
  getTenantAdminEmailStub = sandBox.stub(UserDBCalls, 'getTenantAdminEmail');
  sendMailStub = sandBox.stub(mailer, 'sendMail');
  signStub = sandBox.stub(jwt, 'sign');
});

Before(() => {
  getTenantAdminEmailStub.callsFake((tenantId) => {
    console.log(tenantId,"tenantId")
    if (tenantId === 'tenant123') {
      return 'admin@example.com';
    }else if(tenantId === 'tenant456') {
        return false;
    }
    return null;
  });

  sendMailStub.callsFake((mailOptions) => {
    expect(mailOptions).to.have.own.property('to');
    expect(mailOptions).to.have.own.property('subject');
    expect(mailOptions).to.have.own.property('html');
    return;
  });

  signStub.callsFake(() => 'mockToken');
});

After(() => {
  sandBox.resetHistory();
});

AfterAll(() => {
  sandBox.restore();
});

Given('email: {string}, tenantId: {string}, userId: {string}, roleId: {string}, tempUserEmail: {string}, hours: {string} request temporary role usecase', function (email, tenantId, userId, roleId, tempUserEmail, hours) {
  this.email = email;
  this.tenantId = tenantId;
  this.userId = userId;
  this.roleId = roleId;
  this.tempUserEmail = tempUserEmail;
  this.hours = hours;
});

When('try to request a temporary role', async function () {
  const requestTempRole = makeRequestTempRole(UserDBCalls, mailer, jwt);
  const params = { email: this.email, tenantId: this.tenantId, userId: this.userId, roleId: this.roleId, tempUserEmail: this.tempUserEmail, hours: this.hours };
  try {
    await requestTempRole(params);
    this.result = 'Temporary role requested';
  } catch (error) {
    this.error = error;
  }
});

Then('It should send an approval email to the admin and return success message: {string}', function (result) {
  expect(this.result).to.equal(result);
});

Then('It should return the error: {string} for temporary role request', function (error) {
  expect(this.error.msg).to.equal(error.split(':')[1].trim());
  expect(this.error.status).to.equal(404);
});
