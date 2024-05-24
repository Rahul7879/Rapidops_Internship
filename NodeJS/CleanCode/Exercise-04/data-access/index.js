const fileDBCalls = require("./file")
const folderDBCalls = require('./folder')
const userDBCalls = require('./user')
const roleDBCalls = require("./role")
const tenantDBCalls = require('./organization')


module.exports = Object.freeze({
    fileDBCalls,
    folderDBCalls,
    userDBCalls,
    roleDBCalls,
    tenantDBCalls
})