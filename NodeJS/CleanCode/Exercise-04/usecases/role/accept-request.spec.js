const { expect } = require('chai');
const { Given, When, Then, BeforeAll, Before, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const makeAcceptRole = require('./accept-request');

const RoleDBCalls = {
  updateRoleUser: () => {}
};

let updateRoleUserStub;

BeforeAll(() => {
  updateRoleUserStub = sinon.stub(RoleDBCalls, 'updateRoleUser');
});

AfterAll(() => {
  sinon.restore();
});

Given('a token: {string}', function (token) {
  this.token = token;
});

When('try to accept role', async function () {
  const acceptRoleUseCase = makeAcceptRole(RoleDBCalls, jwt);
  try {
    await acceptRoleUseCase(this.token);
    this.result = 'Role updated successfully';
  } catch (error) {
    this.error = error;
  }
});

Then('It should return a success message: {string}', function (message) {
  expect(this.result).to.equal(message);
});

Then('It should return the error: {string}', function (error) {
  expect(this.error.msg).to.equal(error);
});

Before(() => {
  if (!jwt.verify.restore) { // Check if not already stubbed
    sinon.stub(jwt, 'verify').callsFake((token, secret) => {
      if (token === 'invalid_token') {
        throw { msg: 'Invalid token', status: 401 };
      }
      if (token === 'valid_token_with_correct_data') {
        return { user_id: 'user1', role_id: 'role1' };
      }
      if (token === 'valid_token_with_invalid_role') {
        return { user_id: 'user1', role_id: 'invalid_role' };
      }
      throw { msg: 'Invalid token', status: 401 };
    });
  }

  updateRoleUserStub.callsFake((user_id, role_id) => {
    if (role_id === 'invalid_role') {
      return 0;
    }
    return 1;
  });
});
