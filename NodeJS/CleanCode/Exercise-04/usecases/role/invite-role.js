const { sendMail } = require('../../utilities/send-mail');

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

module.exports = inviteRole