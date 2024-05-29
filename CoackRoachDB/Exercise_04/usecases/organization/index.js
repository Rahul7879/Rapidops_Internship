const {tenantDBCalls} = require('../../data-access');

const makeCreateTenant = require('./create-tenant');

const createTenant = makeCreateTenant(tenantDBCalls);

module.exports = Object.freeze({
    createTenant
});
