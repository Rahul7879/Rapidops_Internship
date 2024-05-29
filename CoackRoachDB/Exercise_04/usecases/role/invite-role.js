module.exports = function makeInviteRole(RoleDBCalls,sendMail) {
    return async function inviteRole (data, user){
        const { emailAndRole } = data;
        const requester = await RoleDBCalls.getUserByEmail(user.email);
    
        if (!requester) {
            throw { msg: 'Requester not found', status: 404 };
        }
    
        const tenantId = requester.my_tenant;
    
        for (const item of emailAndRole) {
            const { email, role_id } = item;
            let user = await RoleDBCalls.getUserByEmail(email);
            let userId;
    
            if (user) {
                userId = user.user_id;
                let addedIn = user.added_in ? JSON.parse(user.added_in) : [];
    
                if (!Array.isArray(addedIn)) {
                    addedIn = [addedIn];
                }
    
                if (!addedIn.includes(tenantId)) {
                    addedIn.push(tenantId);
                    await RoleDBCalls.updateAddedIn(addedIn, userId);
                }
            } else {
                userId = await RoleDBCalls.insertUser(email, tenantId);
            }
  
            await sendMail(email, userId, role_id);
        }
    };
    
};
