const pool = require('../../db/conn');
module.exports = function makeApproveTempRole(
    roleDBCalls,
    mailer,
    jwt
) {
    return  async function approveTempRole(token) {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("coming")
        const { userId, tempUserEmail, roleId, tenantId, hours } = decoded;
        
        const tempUserExpiry = new Date(Date.now() + hours * 60 * 60 * 1000);

        const tempUserId = await roleDBCalls.getTempUserId(tempUserEmail, tenantId);
 
        await roleDBCalls.updateRoleWithTempUser(tempUserId, tempUserExpiry, roleId, tenantId);
    
        const confirmationLink = `localhost:8000/join-temp-role`;
        const message = `Your temporary role has been approved. Click <a href="${confirmationLink}">here</a> to join.`;
    
        await mailer.sendMail({
            to: tempUserEmail,
            subject: 'Tempory Role Approved',
            html: message
        });

        // await sendEmail(tempUserEmail, 'Temporary Role Approved', message);
    }
    
};
