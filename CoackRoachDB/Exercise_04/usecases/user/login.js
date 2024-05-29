module.exports = function makeLoginUser(UserDBCalls,bcrypt,jwt,SECRET_KEY) {
    return async function loginUser (userDetails){
        const { email, password, rememberMe } = userDetails;

        const user = await UserDBCalls.findUserByEmail(email);
    
        if (!user) {
            throw { status: 404, msg: "Username does not exist" };
        }
    
        if (user.password === null) {
            throw { status: 401, msg: 'Password is not set yet, change your password' };
        }
    
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw { status: 401, msg: 'Password does not match' };
        }
    
        const token = jwt.sign({ userId: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: rememberMe ? "7d" : '1h' });
        return { status: 200, msg: 'Login successful', token, my_tenant: user.my_tenant, added_in: user.added_in };
    };
    
};


