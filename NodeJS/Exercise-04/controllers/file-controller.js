const { sendSuccess, sendError } = require('../utilities/response.js');
const pool = require('../db/conn.js');
const fs = require('fs');
const path = require('path');


const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


async function checkUserPermissions(email, permissionRequired) {
    const userPermissionsQuery = `
        SELECT u.user_id, r.permissions, u.my_tenant 
        FROM users u 
        LEFT JOIN roles r ON u.user_id = r.user_id AND r.tenant_id = u.my_tenant 
        WHERE u.email = ? LIMIT 1`;
    const [[user]] = await pool.query(userPermissionsQuery, [email]);

    if (!user || user.user_id === null) {
        throw new Error('No user found or user ID missing');
    }

    if (user.permissions && user.permissions[0] !== permissionRequired) {
        throw new Error('Insufficient permissions');
    }

    return user;
}

const uploadFile = async (req, res) => {
    try {
        const file = req.files.file[0];
        console.log(file,"heerere")
        if (!file) {
            return sendError(res, { msg: 'No file uploaded' }, 400);
        }
        
        const { folderId } = req.body;
        if (!folderId) {
            fs.unlinkSync(file.path);
            return sendError(res, { msg: 'Folder ID is required' }, 400);
        }


        const user = await checkUserPermissions(req.user.email, '1');

        const newFileName = Date.now() + path.extname(file.originalname); 
        const newPath = path.join('uploads', newFileName);

        fs.renameSync(file.path, newPath); 

        const insertFileQuery = 'INSERT INTO files (folder_id, name, tenant_id, file_path) VALUES (?, ?, ?, ?)';
        await pool.query(insertFileQuery, [folderId, file.originalname, user.my_tenant, newPath]);

        sendSuccess(res, { msg: 'File uploaded successfully' }, 201);
    } catch (e) {
        if (req.file) {
            fs.unlinkSync(file.path); 
        }
        console.error(e);
        sendError(res, { msg: 'Error uploading file', error: e.message }, 500);
    }
};

const deleteFile = async (req, res) => {
    try {
        const file_id = req.params.file_id;
        if (!file_id) {
            return sendError(res, { msg: 'File ID is required' }, 400);
        }

        const user = await checkUserPermissions(req.user.email, '1');

        const deleteFileQuery = 'DELETE FROM files WHERE file_id = ? AND tenant_id = ?';
        await pool.query(deleteFileQuery, [file_id, user.my_tenant]);

        sendSuccess(res, { msg: 'File deleted successfully' }, 200);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error deleting file', error: e.message }, 500);
    }
};

const moveFile = async (req, res) => {
    try {
        const { fileId, newFolderId } = req.body;
        if (!fileId || !newFolderId) {
            return sendError(res, { msg: 'File ID and new folder ID are required' }, 400);
        }

        const user = await checkUserPermissions(req.user.email, '1');

        const updateFileQuery = 'UPDATE files SET folder_id = ? WHERE file_id = ? AND tenant_id = ?';
        await pool.query(updateFileQuery, [newFolderId, fileId, user.my_tenant]);

        sendSuccess(res, { msg: 'File moved successfully' }, 200);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error moving file', error: e.message }, 500);
    }
};

module.exports = { uploadFile, deleteFile, moveFile };
