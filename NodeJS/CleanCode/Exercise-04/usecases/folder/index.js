const createFolder = require("./create-folder");
const deleteFolder = require("./delete-folder");
const moveFolder = require("./move-folder");
const assignFoldersToRole = require("./assign-folder");
const getAllAssignedFolders = require("./get-all-folder")

module.exports = {
    createFolder,
    deleteFolder,
    moveFolder,
    assignFoldersToRole,
    getAllAssignedFolders,
};
