const fileUseCases = require("./file")
const folderUseCases = require("./folder")
const userUseCases = require("./user")
const roleUseCases = require('./role')
const tenantUseCases = require('./organization')


module.exports = Object.freeze({
    fileUseCases,
    folderUseCases,
    userUseCases,
    roleUseCases,
    tenantUseCases
})