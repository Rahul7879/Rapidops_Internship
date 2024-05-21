const pool = require('../db/conn');
const fs = require('fs');
const path = require('path');

const checkFileAccess = async (fileId, roleId, tenantId) => {
    const query = `
        SELECT 1 
        FROM files f
        JOIN folders fol ON fol.folder_id = f.folder_id
        JOIN roles r ON r.tenant_id = fol.tenant_id
        JOIN JSON_TABLE(r.folders, '$[*]' COLUMNS(folders_id INT PATH '$')) jt 
        ON jt.folders_id = f.folder_id 
        WHERE f.file_id = ? AND r.role_id = ? AND r.tenant_id = ?`;
    const [result] = await pool.query(query, [fileId, roleId, tenantId]);
    return result.length > 0;
};

const insertFile = async (folderId, fileName, filePath) => {
    const query = 'INSERT INTO files (folder_id, name, file_path) VALUES (?, ?, ?)';
    await pool.query(query, [folderId, fileName, filePath]);
};

const deleteFile = async (fileId) => {
    const query = 'DELETE FROM files WHERE file_id = ?';
    await pool.query(query, [fileId]);
};

const updateFileFolder = async (fileId, newFolderId) => {
    const query = 'UPDATE files SET folder_id = ? WHERE file_id = ?';
    await pool.query(query, [newFolderId, fileId]);
};

const getFileDetails = async (fileId) => {
    const query = 'SELECT * FROM files WHERE file_id = ?';
    const [result] = await pool.query(query, [fileId]);
    return result[0];
};

const renameFile = (oldPath, newPath) => {
    fs.renameSync(oldPath, newPath);
};

const deleteFileFromFileSystem = (filePath) => {
    fs.unlinkSync(filePath);
};

const checkFileExists = (filePath) => {
    return fs.existsSync(filePath);
};

const createReadStream = (filePath) => {
    return fs.createReadStream(filePath);
};

module.exports = {
    checkFileAccess,
    insertFile,
    deleteFile,
    updateFileFolder,
    getFileDetails,
    renameFile,
    deleteFileFromFileSystem,
    checkFileExists,
    createReadStream,
};
