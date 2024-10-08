const {User} = require('../../entities');

module.exports = function makeSignUpUser(UserDBCalls,bcrypt,jwt,SECRET_KEY) {
    return async function signupUser (userDetails){
        const user = User.validate(userDetails);

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
    
        try {
            await UserDBCalls.createUser(user.email, hashPassword, user.fullName);
            const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
            return { status: 201, msg: 'SignUp successful', token };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw { status: 409, msg: 'User already exists' };
            } else {
                throw { status: 500, msg: 'Error during registration', error: error.message };
            }
        }
    };
    
};
