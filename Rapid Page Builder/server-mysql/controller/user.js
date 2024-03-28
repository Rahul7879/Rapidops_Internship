

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import dbcon from "../db/conn.js";
dotenv.config();

const signup = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        console.log("check");
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = { email: req.body.email, name: req.body.name, password: hashedPassword, newsletter: req.body.newsletter };
        const conn = await dbcon();
        const query = 'INSERT INTO users (name, email, password, newsletter) VALUES (?, ?, ?, ?)';
        const [queryResult] = await conn.query(query, [user.name, user.email, user.password, user.newsletter]);
        console.log(queryResult.data);
        res.status(200).json({ msg: 'SignUp successful' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ e: e.message });
    }
};

const login = async (req, res) => {
    try {
        const conn = await dbcon();
        const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
        const [users] = await conn.query(query, [req.body.email]);
        if (users.length === 0) {
            return res.status(404).json({ msg: "username does not exist" });
        }
        const user = users[0];
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign({ email: user.email, name: user.name }, "jwt-access-token-secret-key", { expiresIn: '6h' });
            const refreshtoken = jwt.sign({ email: user.email, name: user.name }, "jwt-refresh-token-secret-key", { expiresIn: '7d' });

            res.cookie("accessToken", accessToken, { expiresIn: '6h' })
            res.cookie("refreshtoken", refreshtoken, { expiresIn: '7d' })

            return res.status(201).json({ accessToken: accessToken, refreshtoken: refreshtoken, name: user.name, email: user.email });

        } else {
            return res.status(406).json({ msg: "Password does not match" });
        }
    } catch (e) {
        console.log("login error:", e.message);
        return res.status(501).json({ msg: "error while login" });
    }
}


const getIndividual = async (req, res) => {
    try {
        const conn = await dbcon();
        const query = `SELECT * FROM pages WHERE _id = ? LIMIT 1`;
        const [rows] = await conn.execute(query, [req.body.id]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: "content does not exist" });
        }
        const user = rows[0];
        console.log(user);
        return res.status(200).json({ msg: "received", user: user });
    } catch (e) {
        console.log("error while fetching", e);
        return res.status(501).json({ msg: "error while login" }); 
    }
};

const checkUser = async (req, res) => {
    if (req.cookies.accessToken) {
        return res.json({ valide: true })
    } else {
        return res.json({ valid: false })
    }
}


export { signup, login, getIndividual, checkUser }