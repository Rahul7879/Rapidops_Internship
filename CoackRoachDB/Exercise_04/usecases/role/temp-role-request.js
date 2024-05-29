module.exports = function makeRequestTempRole(
    UserDBCalls,
    mailer,
    jwt
) {
    return async function requestTempRole({ email, tenantId, userId,roleId, tempUserEmail, hours }) {
        
        const adminEmail = await UserDBCalls.getTenantAdminEmail(tenantId);
     
        if (!adminEmail) {
            throw { msg: 'Admin not found for this tenant', status: 404 };
        }
        const token = jwt.sign({ userId, tempUserEmail, tenantId,roleId, hours }, process.env.SECRET_KEY, { expiresIn: '1h' });
     
        const approvalLink = `http://localhost:8000/approve-temp-role?token=${token}`;
        console.log(approvalLink)
        const message = `User with email ${email} wants to assign a temporary role to ${tempUserEmail} for ${hours} hours. Click <a href="${approvalLink}">here</a> to approve.`;

        await mailer.sendMail({
            to: adminEmail,
            subject: 'Role Approval Request',
            html: message
        });

        // await mailersendEmail(adminEmail, 'Temporary Role Assignment Request', message);
    };
};
