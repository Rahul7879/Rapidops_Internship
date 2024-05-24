const { sendSuccess, sendError } = require('../../utilities/response.js');
const {tenantUseCases} = require('../../usecases');
const makeCreateTenantAction = require('./create-tenant.js');

const createTenantAction = makeCreateTenantAction(tenantUseCases, sendSuccess, sendError);

module.exports = Object.freeze({
    createTenantAction
});
