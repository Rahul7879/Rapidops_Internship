const { sendSuccess, sendError } = require('../utilities/response.js');
const pool = require('../db/conn.js');

const uploadFile = async (req, res) => {
    try {
        const { folderId, fileName } = req.body;
        // const fileContent = req.files.file[0].originalFileName; 
    
        console.log(folderId,fileName)

        if (!folderId || !fileName ) {
            return sendError(res, { msg: 'Missing required file data' }, 400);
        }

        const insertFileQuery = 'INSERT INTO files (folder_id, name) VALUES (?, ?)';
        await pool.query(insertFileQuery, [folderId, fileName]);

        sendSuccess(res, { msg: 'File uploaded successfully' }, 201);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error uploading file', error: e.message }, 500);
    }
};

const deleteFile = async (req, res) => {
    try {
        const { file_id } = req.params;
        console.log(file_id);

        if (!file_id) {
            return sendError(res, { msg: 'File ID is required' }, 400);
        }

        const deleteFileQuery = 'DELETE FROM files WHERE file_id = ?';
        await pool.query(deleteFileQuery, [file_id]);

        sendSuccess(res, { msg: 'File deleted successfully' }, 200);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error deleting file', error: e.message }, 500);
    }
};


const moveFile = async (req, res) => {
    try {
        const { fileId, newFolderId } = req.params;

        if (!fileId || !newFolderId) {
            return sendError(res, { msg: 'File ID and new folder ID are required' }, 400);
        }

        const updateFileQuery = 'UPDATE files SET folder_id = ? WHERE file_id = ?';
        await pool.query(updateFileQuery, [newFolderId, fileId]);

        sendSuccess(res, { msg: 'File moved successfully' }, 200);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error moving file', error: e.message }, 500);
    }
};


module.exports = {uploadFile,deleteFile,moveFile};