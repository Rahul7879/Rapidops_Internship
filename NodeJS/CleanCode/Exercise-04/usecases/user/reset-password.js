module.exports = function makeResetPassword(UserDBCalls, bcrypt, jwt, SECRET_KEY) {
    return async function resetPassword(token, newPassword) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const email = decoded.email;
            
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);

            await UserDBCalls.updateUserPassword(email, hashPassword);

            return { status: 200, msg: 'Password reset successful' };
        } catch (error) {
            throw { status: 400, msg: 'Invalid or expired token', error: error.message };
        }
    };
};
