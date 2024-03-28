import jwt from "jsonwebtoken";

const varifyUser = async (req, res, next) => {
    const tokens = await JSON.parse(req.headers.authorization)
    const accesstoken = tokens.a;
    if (!accesstoken) {
        return res.json({ valid: false, message: "No AccessToken" });
        if (renewToken(req, res, tokens.r, tokens.email)) {
            next()
        }
    } else {
        jwt.verify(accesstoken, 'jwt-access-token-secret-key', (err, decoded) => {
            if (err) {
                console.log("not accesstoken")
                return res.json({ authorized: false });
            } else {
                req.email = decoded.email
                console.log(decoded.email)
                next()
            }
        })
    }
}

const renewToken = async (req, res, token, email) => {
    const refreshtoken = await req.cookies.refreshtoken;
    let exist = false;
    if (!token) {
        return res.json({ valid: false, message: "No Refresh token" })
    } else {
        jwt.verify(token, 'jwt-refresh-token-secret-key', async (err, decoded) => {
            if (err) {
                console.log("------------", token);
                res.json({ valid: false, message: "Invalid Refresh Token" })
            } else {
                console.log("generate")
                // let user = await User.findOne({ email: email });
                const accessToken = jwt.sign(user.toJSON(), "jwt-access-token-secret-key", { expiresIn: '1h' });
                res.cookie('accessToken', accessToken, { maxAge: 60000 })
            }
            exist = true;
        })
    }
    return exist;
}

export default varifyUser;