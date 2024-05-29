const pool = require('../db/conn');
const fs = require('fs');
const path = require('path');

const checkFileAccess = async (fileId, roleId) => {
    const query = `
    SELECT 1 
    FROM files f
    JOIN folders fol ON fol.folder_id = f.folder_id
    JOIN roles r ON JSON_CONTAINS(r.folders, CAST(fol.folder_id AS JSON), '$')
    WHERE f.file_id = $1 AND r.role_id = $2`;
    const { rows } = await pool.query(query, [fileId, roleId]);
    return rows.length > 0;
};

const insertFile = async (folderId, fileName, filePath) => {
    const query = 'INSERT INTO files (folder_id, name, file_path) VALUES ($1, $2, $3)';
    await pool.query(query, [folderId, fileName, filePath]);
};

const deleteFile = async (fileId) => {
    const query = 'DELETE FROM files WHERE file_id = $1';
    await pool.query(query, [fileId]);
};

const updateFileFolder = async (fileId, newFolderId) => {
    const query = 'UPDATE files SET folder_id = $1 WHERE file_id = $2';
    await pool.query(query, [newFolderId, fileId]);
};

const getFileDetails = async (fileId) => {
    const query = 'SELECT * FROM files WHERE file_id = $1';
    const { rows } = await pool.query(query, [fileId]);
    return rows[0];
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
