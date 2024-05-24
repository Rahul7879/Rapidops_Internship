const path = require('path');
const {fileDBCalls} = require('../../data-access')

const makeGetFile = require('./get-file');
const makeGetContentType = require('./get-content-type');
const makeUploadFile = require('./upload-file');
const makeMoveFile = require("./move-file")
const makeDeleteFile = require("./delete-file")


const getFile = makeGetFile(fileDBCalls);
const getContentType = makeGetContentType(path);
const uploadFile = makeUploadFile(fileDBCalls,path);
const moveFile = makeMoveFile(fileDBCalls);
const deleteFile = makeDeleteFile(fileDBCalls);

module.exports = Object.freeze({
    getFile,
    getContentType,
    uploadFile,
    moveFile,
    deleteFile
});
