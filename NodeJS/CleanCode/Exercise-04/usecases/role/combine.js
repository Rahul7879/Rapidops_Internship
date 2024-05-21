const jwt = require('jsonwebtoken');
const { sendMail } = require('../../utilities/send-mail');

const createRole = async (data, user, roleGateway) => {
    const { isReadable, isWritable, isDeletable, isEditable, roleName } = data;
    const permissions = `${isReadable ? '1' : '0'}${isWritable ? '1' : '0'}${isDeletable ? '1' : '0'}${isEditable ? '1' : '0'}`;
    const tenantId = await roleGateway.getTenantIdByEmail(user.email);

    if (!tenantId) {
        throw { msg: 'No tenant ID found for user', status: 400 };
    }

    if (await roleGateway.checkRoleExists(tenantId, roleName)) {
        throw { msg: `Role already exists in tenant ${tenantId}`, status: 409 };
    }

    await roleGateway.createRole(tenantId, permissions, roleName);
};

const inviteRole = async (data, user, roleGateway) => {
    const { emailAndRole } = data;
    const requester = await roleGateway.getUserByEmail(user.email);

    if (!requester) {
        throw { msg: 'Requester not found', status: 404 };
    }

    const tenantId = requester.my_tenant;

    for (const item of emailAndRole) {
        const { email, role_id } = item;
        let user = await roleGateway.getUserByEmail(email);
        let userId;

        if (user) {
            userId = user.user_id;
            let addedIn = user.added_in ? JSON.parse(user.added_in) : [];

            if (!Array.isArray(addedIn)) {
                addedIn = [addedIn];
            }

            if (!addedIn.includes(tenantId)) {
                addedIn.push(tenantId);
                await roleGateway.updateAddedIn(addedIn, userId);
            }
        } else {
            userId = await roleGateway.insertUser(email, tenantId);
        }

        await sendMail(email, userId, role_id);
    }
};

const acceptRequest = async (token, roleGateway) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded.role_id || !decoded.user_id) {
        throw { msg: 'Invalid token', status: 401 };
    }

    const affectedRows = await roleGateway.updateRoleUser(decoded.user_id, decoded.role_id);

    if (affectedRows === 0) {
        throw { msg: 'Role update failed or role already assigned', status: 400 };
    }
};

module.exports = {
    createRole,
    inviteRole,
    acceptRequest,
};
