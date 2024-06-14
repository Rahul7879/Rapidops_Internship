module.exports = function makeCreateTenant(tenantDBCalls) {
    return async function createTenant(email, orgName) {
        const userId = await tenantDBCalls.fetchUserIdByEmail(email);
        if (!userId) {
            throw { msg: 'User not found', status: 404 };
        }

        const exists = await tenantDBCalls.checkExistingOrganization(userId);
        if (exists) {
            throw { msg: 'Organization already created for this user', status: 409 };
            // throw new Error("Organization already created for this user",409);
        }

        const newOrgId = await tenantDBCalls.createOrganization(userId, orgName);
        await tenantDBCalls.setTenantForUser(userId, newOrgId);
        await tenantDBCalls.createAdminRole(userId, newOrgId);

        return newOrgId;
    };
};
