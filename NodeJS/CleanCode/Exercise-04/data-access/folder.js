const pool = require('../db/conn');

const checkParentFolderExists = async (parentFolder, tenantId) => {
    const query = 'SELECT 1 FROM folders WHERE folder_id = ? AND tenant_id = ?';
    const [result] = await pool.query(query, [parentFolder, tenantId]);
    return result.length > 0;
};

const insertFolder = async (tenantId, parentFolder, folderName) => {
    const query = 'INSERT INTO folders (tenant_id, parent_folder_id, folder_name) VALUES (?, ?, ?)';
    await pool.query(query, [tenantId, parentFolder || null, folderName]);
};

const deleteFolder = async (folderId, tenantId) => {
    const query = 'DELETE FROM folders WHERE folder_id = ? AND tenant_id = ?';
    await pool.query(query, [folderId, tenantId]);
};

const checkFolderAccess = async (folderId, roleId, tenantId) => {
    const query = `
        SELECT 1 
        FROM roles r 
        JOIN JSON_TABLE(r.folders, '$[*]' COLUMNS(folders_id INT PATH '$')) jt 
        ON jt.folders_id = ? 
        WHERE r.role_id = ? AND r.tenant_id = ?`;
    const [result] = await pool.query(query, [folderId, roleId, tenantId]);
    return result.length > 0;
};

const updateFolderParent = async (newParentFolder, folderId, tenantId) => {
    const query = 'UPDATE folders SET parent_folder_id = ? WHERE folder_id = ? AND tenant_id = ?';
    await pool.query(query, [newParentFolder, folderId, tenantId]);
};

const assignFoldersToRole = async (folders, roleId, tenantId) => {
    const query = 'UPDATE roles SET folders = ? WHERE role_id = ? AND tenant_id = ?';
    await pool.query(query, [JSON.stringify(folders), roleId, tenantId]);
};

const getAssignedFolders = async (roleId, tenantId) => {
    const query = 'SELECT folders FROM roles WHERE role_id = ? AND tenant_id = ?';
    const [result] = await pool.query(query, [roleId, tenantId]);
    return result.length > 0 ? result[0].folders : null;
};

const getAllFolders = async (tenantId) => {
    const query = 'SELECT folder_id FROM folders WHERE tenant_id = ?';
    const [result] = await pool.query(query, [ tenantId]);
 
    if(result.length > 0){
        const resultArray = [];
       result.forEach((folder)=>{
         resultArray.push(folder.folder_id)
       })
       return resultArray
    }

    return null;
};

const getFoldersByParentId = async (parentFolderId, limit, offset) => {
    const query = 'SELECT * FROM folders WHERE parent_folder_id = ? LIMIT ? OFFSET ?';
    const [result] = await pool.query(query, [parentFolderId, limit, offset]);
    return result;
};

const getFilesByFolderId = async (folderId, limit, offset) => {
    const query = 'SELECT * FROM files WHERE folder_id = ? LIMIT ? OFFSET ?';
    const [result] = await pool.query(query, [folderId, limit, offset]);
    return result;
};

const countFoldersByParentId = async (parentFolderId) => {
    const query = 'SELECT COUNT(*) AS count FROM folders WHERE parent_folder_id = ?';
    const [result] = await pool.query(query, [parentFolderId]);
    return result[0].count;
};

const countFilesByFolderId = async (folderId) => {
    const query = 'SELECT COUNT(*) AS count FROM files WHERE folder_id = ?';
    const [result] = await pool.query(query, [folderId]);
    return result[0].count;
};

module.exports = {
    checkParentFolderExists,
    insertFolder,
    deleteFolder,
    checkFolderAccess,
    updateFolderParent,
    assignFoldersToRole,
    getAssignedFolders,
    getAllFolders,
    getFoldersByParentId,
    getFilesByFolderId,
    countFoldersByParentId,
    countFilesByFolderId
};
