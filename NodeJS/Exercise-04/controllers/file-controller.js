const fs = require("fs");
const bcrypt = require("bcrypt");
const dbcon = require("../db/conn.js")
const ResponseHandler = require('../utilities/response.js');

exports.getAllUsers = async (req, res) => {
    try {
        const conn = await dbcon();
        const query = 'SELECT * FROM user';
        const [results] = await conn.query(query);
       console.log(results,"coming")
        if (results.length === 0) {
            let data = { msg: 'No Data' }
            ResponseHandler.sendSuccess(res, data);
        } else {
            let data = { msg: 'Received',users: results }
            ResponseHandler.sendSuccess(res, data);
        }
    } catch (e) {
        console.error(e);
        let data = { msg: 'Error' }
        ResponseHandler.sendSuccess(res,data,404);
    }
};

exports.addUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        console.log("Hello",req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = { email: req.body.email, name: req.body.name, password: hashedPassword};
        const conn = await dbcon();
        const query = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
        const [queryResult] = await conn.query(query, [user.name, user.email, user.password]);
        console.log(queryResult.data);
        let data = { msg: 'SignUp successful' }
        ResponseHandler.sendSuccess(res, data);
    } catch (e) {
        console.error(e);
        let data = { msg: 'SignUp Unsuccessfull' }
        ResponseHandler.sendSuccess(res,data,404);
    }

};

exports.deleteController = async (req, res) => {
    try {
        const conn = await dbcon();
        console.log(req.params.id);
        const [result] = await conn.execute('DELETE FROM user WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            let data = { msg: 'No user available with this id' }
            ResponseHandler.sendError(res, data);
        }else{
            let data = { msg: 'Page successfully deleted.',deletedUser:result }
            ResponseHandler.sendSuccess(res, data);
        }
      } catch (e) {
        console.error(e);
        let data = { msg: 'Page not deleted.' }
            ResponseHandler.sendError(res, data);
      }
};

exports.putController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('PUT request called - User');
};

exports.patchController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('PATCH request called - User');
};
