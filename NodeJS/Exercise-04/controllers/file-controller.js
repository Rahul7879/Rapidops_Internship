const { sendSuccess, sendError } = require('../utilities/response.js');
const pool = require('../db/conn.js');
const fs = require('fs');
const path = require('path');
const { cls } = require('sequelize');

const checkPermission = (permissions, actionIndex, isAdmin) => {
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};


const uploadFile = async (req, res) => {
    const files = req.files; 
    console.log(files)
    try {
        if (!files) { 
            return sendError(res, { msg: 'No file uploaded' }, 400);
        }

        const { formfolder } = req.body;
        const folderId = +formfolder[0];
        
        if (!folderId) {
            fs.unlinkSync(files.file[0].path);
            return sendError(res, { msg: 'Folder ID is required' }, 400);
        }

        const { tenantId, permissions, isAdmin } = req.user;

        if (!checkPermission(permissions, 1, isAdmin)) { // 1 indicates the "create" permission
            fs.unlinkSync(files.file[0].path);
            return sendError(res, { msg: 'Insufficient permissions' }, 403);
        }
        console.log(files.file,"file")
        const newFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${path.extname(files.file[0].originalFilename)}`;
        const newPath = path.join('uploads', newFileName);
        
        fs.renameSync(files.file[0].filepath, newPath); 
        
        const insertFileQuery = 'INSERT INTO files (folder_id, name, file_path) VALUES (?, ?, ?)';
        await pool.query(insertFileQuery, [folderId, files.file[0].originalFilename, newPath]);

        sendSuccess(res, { msg: 'File uploaded successfully' }, 201);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error uploading file', error: e.message }, 500);
    }
};

const deleteFile = async (req, res) => {
    try {
        const fileId = +req.params.fileId;
        const { tenantId, permissions, isAdmin, roleId } = req.user;

        if (!fileId) {
            return sendError(res, { msg: 'File ID is required' }, 400);
        }

        if (!checkPermission(permissions, 2, isAdmin)) { // 2 indicates the "delete" permission
            return sendError(res, { msg: 'Insufficient permissions' }, 403);
        }

        if (!isAdmin) {
            // Check if the user has access to the file's folder
            const checkFileQuery = `
                SELECT 1 
                FROM files f
                JOIN folders fol ON fol.folder_id = f.folder_id
                JOIN roles r ON r.tenant_id = fol.tenant_id
                JOIN JSON_TABLE(r.folders, '$[*]' COLUMNS(folders_id INT PATH '$')) jt 
                ON jt.folders_id = f.folder_id 
                WHERE f.file_id = ? AND r.role_id = ? AND r.tenant_id = ?`;
            const [fileAccess] = await pool.query(checkFileQuery, [fileId, roleId, tenantId]);
            if (!fileAccess.length) {
                return sendError(res, { msg: 'You do not have permission to delete this file' }, 403);
            }
        }

        const deleteFileQuery = 'DELETE FROM files WHERE file_id = ?';
        await pool.query(deleteFileQuery, [fileId]);

        sendSuccess(res, { msg: 'File deleted successfully' }, 200);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error deleting file', error: e.message }, 500);
    }
};

const moveFile = async (req, res) => {
    try {
        const fileId= +req.params.fileId;
        const {newFolderId } = req.body;
        const { tenantId, permissions, isAdmin, roleId } = req.user;

        console.log(fileId,newFolderId);

        if (!fileId || !newFolderId) {
            return sendError(res, { msg: 'File ID and new folder ID are required' }, 400);
        }

        if (!checkPermission(permissions, 3, isAdmin)) { // 3 indicates the "update" permission
            return sendError(res, { msg: 'Insufficient permissions' }, 403);
        }

        if (!isAdmin) {
            // Check if the user has access to the file's current folder
            const checkFileQuery = `
                SELECT 1 
                FROM files f
                JOIN folders fol ON fol.folder_id = f.folder_id
                JOIN roles r ON r.tenant_id = fol.tenant_id
                JOIN JSON_TABLE(r.folders, '$[*]' COLUMNS(folders_id INT PATH '$')) jt 
                ON jt.folders_id = f.folder_id 
                WHERE f.file_id = ? AND r.role_id = ? AND r.tenant_id = ?`;
            const [fileAccess] = await pool.query(checkFileQuery, [fileId, roleId, tenantId]);
            if (!fileAccess.length) {
                return sendError(res, { msg: 'You do not have permission to move this file' }, 403);
            }
        }

        const updateFileQuery = 'UPDATE files SET folder_id = ? WHERE file_id = ?';
        await pool.query(updateFileQuery, [newFolderId, fileId]);

        sendSuccess(res, { msg: 'File moved successfully' }, 200);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error moving file', error: e.message }, 500);
    }
};

const getFile = async (req, res) => {
    try {
        const fileId = +req.params.fileId;
        const { tenantId, permissions, isAdmin, roleId } = req.user;

        if (!fileId) {
            return sendError(res, { msg: 'File ID is required' }, 400);
        }

        if (!checkPermission(permissions, 0, isAdmin)) { // 0 indicates the "read" permission
            return sendError(res, { msg: 'Insufficient permissions' }, 403);
        }

        let getFileQuery = 'SELECT * FROM files WHERE file_id = ?';
        const queryParams = [fileId,roleId,tenantId];

        if (!isAdmin) {
            // Non-admins need additional check for folder access
            getFileQuery = `
                SELECT f.* 
                FROM files f
                JOIN folders fol ON fol.folder_id = f.folder_id
                JOIN roles r ON r.tenant_id = fol.tenant_id
                JOIN JSON_TABLE(r.folders, '$[*]' COLUMNS(folders_id INT PATH '$')) jt 
                ON jt.folders_id = f.folder_id 
                WHERE f.file_id = ? AND r.role_id = ? AND r.tenant_id = ?`;
          
        }

        const [fileResult] = await pool.query(getFileQuery, queryParams);

        if (!fileResult || fileResult.length === 0) {
            return sendError(res, { msg: 'File not found' }, 404);
        }

        const filePath = fileResult[0].file_path;

        if (!fs.existsSync(filePath)) {
            return sendError(res, { msg: 'File not found on server' }, 404);
        }

        const contentType = getContentType(filePath);
        res.setHeader('Content-Type', contentType);

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error fetching file', error: e.message }, 500);
    }
};

function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.txt':
            return 'text/plain';
        case '.html':
            return 'text/html';
        case '.js':
            return 'application/javascript';
        case '.json':
            return 'application/json';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.pdf':
            return 'application/pdf';
        default:
            return 'application/octet-stream';
    }
}


module.exports = { uploadFile, deleteFile, moveFile,getFile };
