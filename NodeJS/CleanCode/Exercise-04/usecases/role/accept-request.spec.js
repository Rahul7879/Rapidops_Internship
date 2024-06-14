const { expect } = require('chai');
const { Given, When, Then, BeforeAll,Before, AfterAll } = require('@cucumber/cucumber');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const makeAcceptRole = require('./accept-request');

const RoleDBCalls = {
  updateRoleUser: () => {}
};

let updateRoleUserStub;

Before(() => {
  sinon.stub(jwt, 'verify').callsFake((token, secret) => {
    if (token === 'invalid_token') {
      throw { msg: 'Invalid token', status: 400 };
    }
    if (token === 'valid_token_with_correct_data') {
      return { user_id: 'user1', role_id: 'role1' };
    }
    if (token === 'valid_token_with_invalid_role') {
      throw { msg: 'Role update failed or role already assigned', status: 400 };
    }
    throw { msg: 'Invalid token', status: 400 };
  });

  updateRoleUserStub.callsFake((user_id, role_id) => {
    if (role_id === 'invalid_role') {
      return 0; 
    }
    return 1; 
  });
});

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

Then('It should return the error: {string} for accept request', function (error) {
  expect(this.error.msg).to.equal(error);
  expect(this.error.status).to.equal(400);
});


