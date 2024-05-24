const fileActions = require("./file")
const folderActions = require('./folder')
const userActions = require('./user')
const roleActions = require("./role")
const tenantActions = require('./organization')


module.exports = Object.freeze({
    fileActions,
    folderActions,
    userActions,
    roleActions,
    tenantActions
})