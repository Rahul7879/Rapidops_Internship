module.exports = function makeForgotPassword(UserDBCalls, jwt, SECRET_KEY, mailer) {
    return async function forgotPassword(userDetails) {
   
        const { email } = userDetails;

        const user = await UserDBCalls.findUserByEmail(email);
        if (!user) {
            throw { status: 404, msg: 'User not found' };
        }

        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        const resetPasswordURL = `http://localhost:8000/reset-password?token=${token}`;

        try {
            await mailer.sendMail({
                to: user.email,
                subject: 'Password Reset Request',
                html: `<p>To reset your password, please click the link below:</p><p><a href="${resetPasswordURL}">${resetPasswordURL}</a></p>`
            });

            return { status: 200, msg: 'Password reset link sent to email' };
        } catch (error) {
            throw { status: 500, msg: 'Error sending email', error: error.message };
        }
    };
};
