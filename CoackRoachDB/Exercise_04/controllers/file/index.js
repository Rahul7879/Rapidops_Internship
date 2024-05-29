const fs = require("fs");

const {fileUseCases} = require('../../usecases');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const makeGetFileAction = require('./get-file.js');
const makeDeleteFile = require('./delete-file.js');
const makeUploadFileAction = require('./upload-file.js');
const makeMoveFileAction = require('./move-file.js');


const getFileAction = makeGetFileAction(fileUseCases, sendSuccess, sendError,fs);
const uploadFileAction = makeUploadFileAction(fileUseCases, sendSuccess, sendError);
const moveFileAction = makeMoveFileAction(fileUseCases, sendSuccess, sendError);
const deleteFileAction = makeDeleteFile(fileUseCases, sendSuccess, sendError);

module.exports = Object.freeze({
    getFileAction,
    deleteFileAction,
    uploadFileAction,
    moveFileAction
});
