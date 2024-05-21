const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateEmail, validateFullName, validatePassword } = require('../../utilities/validations');
const SECRET_KEY = process.env.SECRET_KEY;

const signupUser = async (userDetails, userGateway) => {
    const { email, password, fullName } = userDetails;

    if (!validateEmail(email)) {
        throw { status: 400, msg: 'Invalid email format' };
    }
    if (!validatePassword(password)) {
        throw { status: 400, msg: 'Password must be at least 6 characters long' };
    }
    if (!validateFullName(fullName)) {
        throw { status: 400, msg: 'Full name must not contain numbers' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await userGateway.createUser(email, hashPassword, fullName);
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        return { status: 201, msg: 'SignUp successful', token };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw { status: 409, msg: 'User already exists' };
        } else {
            throw { status: 500, msg: 'Error during registration', error: error.message };
        }
    }
};

module.exports = { signupUser };
