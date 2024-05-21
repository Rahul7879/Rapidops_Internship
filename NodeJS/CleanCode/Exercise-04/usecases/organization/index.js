const Organization = require('../../entities/organization');
const { createOrganization, checkExistingOrganization } = require('../../gateways/organization');

const createOrganizationForUser = async (userId, orgName) => {
    const organization = Organization.validate({ name: orgName, adminId: userId });

    const exists = await checkExistingOrganization(userId);
    if (exists) {
        throw { status: 409, msg: 'Organization already created for this user' };
    }

    await createOrganization(organization.name, organization.adminId);
};

module.exports = createOrganizationForUser;
