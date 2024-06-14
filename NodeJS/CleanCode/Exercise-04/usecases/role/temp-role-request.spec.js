const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const makeRequestTempRole = require('./temp-role-request'); // Update with your actual file name and path

let UserDBCalls, mailer, requestTempRole;
let adminEmail, email, tenantId, userId, roleId, tempUserEmail, hours;

Given('the admin email for tenant with ID {string} is {string}', function (id, admin) {
    UserDBCalls = {
        getTenantAdminEmail: sinon.stub().withArgs(id).resolves(admin)
    };
    tenantId = id;
    adminEmail = admin;
});

Given('the admin email for tenant with ID {string} is not found', function (id) {
    UserDBCalls = {
        getTenantAdminEmail: sinon.stub().withArgs(id).resolves(null)
    };
    tenantId = id;
});

When('the user with email {string} requests to assign temporary role with ID {string} to {string} for  hours', async function (userEmail, roleIdVal, tempUserEmailVal, hoursVal) {
    console.log(userEmail, roleIdVal, tempUserEmailVal, hoursVal)
    email = userEmail;
    roleId = roleIdVal;
    tempUserEmail = tempUserEmailVal;
    hours = hoursVal;
    userId = 'user1'; // Mock user ID

    const jwtStub = sinon.stub(jwt, 'sign').returns('mock-token');
    mailer = {
        sendMail: sinon.stub().resolves()
    };
    requestTempRole = makeRequestTempRole(UserDBCalls, mailer, jwt);
    await requestTempRole({ email, tenantId, userId, roleId, tempUserEmail, hours });
});

Then('an email should be sent to {string} with an approval link', function (admin) {
    expect(mailer.sendMail.calledOnce).to.be.true;
    const sentMailArgs = mailer.sendMail.firstCall.args[0];
    expect(sentMailArgs.to).to.equal(admin);
    expect(sentMailArgs.subject).to.equal('Role Approval Request');
    expect(sentMailArgs.html).to.include('approve-temp-role?token=mock-token');
});

Then('it should return the error {string}', function (error) {
    expect(this.error.msg).to.equal(error);
});
