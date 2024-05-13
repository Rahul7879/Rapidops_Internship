const { sendSuccess, sendError } = require('../utilities/response.js');
const pool = require('../db/conn.js');

const createFolder = async (req, res) => {
    try {
        const { email } = req.user;
        const { parentFolder, folderName } = req.body;

        if (!folderName) {
            return sendError(res, { msg: 'Folder name is required' }, 400);
        }

        const userPermissionsQuery = `
            SELECT u.user_id, r.permissions, u.my_tenant 
            FROM users u 
            LEFT JOIN roles r ON u.user_id = r.user_id AND r.tenant_id = u.my_tenant 
            WHERE u.email = ? LIMIT 1`;
        const [[user]] = await pool.query(userPermissionsQuery, [email]);

        if (!user || user.user_id === null) {
            return sendError(res, { msg: 'No user found or user ID missing' }, 404);
        }

        if (parentFolder) {
            const parentCheckQuery = 'SELECT 1 FROM folders WHERE folder_id = ? AND tenant_id = ?';
            const [parentExists] = await pool.query(parentCheckQuery, [parentFolder, user.my_tenant]);
            if (!parentExists.length) {
                return sendError(res, { msg: 'Invalid parent folder ID' }, 400);
            }
        }

        if (user.permissions && user.permissions[0] !== '1') {
            return sendError(res, { msg: 'No permission to create folder' }, 403);
        }

        const insertFolderQuery = 'INSERT INTO folders (tenant_id, parent_folder_id, folder_name) VALUES (?, ?, ?)';
        await pool.query(insertFolderQuery, [user.my_tenant, parentFolder || null, folderName]);
        sendSuccess(res, { msg: 'Folder created successfully' }, 201);

    } catch (e) {
        console.error(e);
        if (e.code === 'ER_DUP_ENTRY') {
            sendError(res, { msg: 'Folder already exists' }, 409);
        } else {
            sendError(res, { msg: 'Error during folder creation', error: e.message }, 500);
        }
    }
};

const getAllFolders = async (req, res) => {
    try {
        const tenant_id = req.params.tenant_id;
        const user_email = req.user.email;

        const getFoldersQuery = 'SELECT * FROM folders WHERE tenant_id = ?';
        const [folders] = await pool.query(getFoldersQuery, [tenant_id]);

        sendSuccess(res, { folders }, 200);

    } catch (e) {
        sendError(res, { msg: 'Error getting all folders', error: e.message }, 500);
    }
};

const assignFoldersToRole = async (req, res) => {
    try {
        const { folders } = req.body;
        const { tenant_id, role_id } = req.params;

        const assignFoldersQuery = 'UPDATE roles SET folders = ? WHERE role_id = ? AND tenant_id = ?';
        await pool.query(assignFoldersQuery, [JSON.stringify(folders), role_id, tenant_id]);

        sendSuccess(res, { msg: 'Folders assigned to role successfully' }, 200);

    } catch (e) {
        sendError(res, { msg: 'Error assigning folders to role', error: e.message }, 500);
    }
};

const getAllAssignedFolders = async (req, res) => {
    try {
        const { tenant_id, role_id } = req.params;
        console.log(tenant_id,role_id);

        if (!tenant_id || !role_id) {
            return sendError(res, { msg: 'Tenant ID and Role ID are required' }, 400);
        }

        const getAssignedFoldersQuery = 'SELECT folders FROM roles WHERE role_id = ? AND tenant_id = ?';
        const [results] = await pool.query(getAssignedFoldersQuery, [role_id, tenant_id]);

        if (results.length === 0) {
            return sendError(res, { msg: 'No assigned folders found for this role' }, 404);
        }

        const assignedFolders = results[0].folders ? JSON.parse(results[0].folders) : [];
        sendSuccess(res, { assignedFolders }, 200);

    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error getting assigned folders', error: e.message }, 500);
    }
};


const deleteFolder = async (req, res) => {
    try {
        const { email } = req.user;
        const  folderId  = +req.params.folder_id;

        if (!folderId) {
            return sendError(res, { msg: 'Folder ID is required' }, 400);
        }

        const userPermissionsQuery = `
            SELECT u.user_id, r.permissions, u.my_tenant 
            FROM users u 
            LEFT JOIN roles r ON u.user_id = r.user_id AND r.tenant_id = u.my_tenant 
            WHERE u.email = ? LIMIT 1`;
        const [[user]] = await pool.query(userPermissionsQuery, [email]);

        if (!user || user.user_id === null) {
            return sendError(res, { msg: 'No user found or user ID missing' }, 404);
        }

        if (user.permissions && user.permissions[0] !== '1') {
            return sendError(res, { msg: 'No permission to delete folder' }, 403);
        }

        const deleteFolderQuery = 'DELETE FROM folders WHERE folder_id = ? AND tenant_id = ?';
        await pool.query(deleteFolderQuery, [folderId, user.my_tenant]);
        sendSuccess(res, { msg: 'Folder and all contents deleted successfully' }, 200);
    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error deleting folder', error: e.message }, 500);
    }
};


const moveFolder = async (req, res) => {
    try {
        const { email } = req.user;
        const folderId= +req.params.folder_id; 
        const newParentId= +req.params.parent_folder_id; 

        console.log(req.params,folderId,newParentId);
        if (!folderId) {
            return sendError(res, { msg: 'Folder ID is required' }, 400);
        }

        const userPermissionsQuery = `
            SELECT u.user_id, r.permissions, u.my_tenant 
            FROM users u 
            LEFT JOIN roles r ON u.user_id = r.user_id AND r.tenant_id = u.my_tenant 
            WHERE u.email = ? LIMIT 1`;
        const [[user]] = await pool.query(userPermissionsQuery, [email]);

        if (!user || user.user_id === null) {
            return sendError(res, { msg: 'No user found or user ID missing' }, 404);
        }

        if (user.permissions && user.permissions[0] !== '1') {
            return sendError(res, { msg: 'No permission to move folder' }, 403);
        }

        // Check if newParentId exists and is within the same tenant
        if (newParentId !== null) {
            const parentCheckQuery = 'SELECT 1 FROM folders WHERE folder_id = ? AND tenant_id = ?';
            const [parentExists] = await pool.query(parentCheckQuery, [newParentId, user.my_tenant]);
            if (!parentExists.length) {
                return sendError(res, { msg: 'Invalid or non-existent new parent folder ID' }, 400);
            }
        }

        const updateFolderQuery = 'UPDATE folders SET parent_folder_id = ? WHERE folder_id = ? AND tenant_id = ?';
        await pool.query(updateFolderQuery, [newParentId, folderId, user.my_tenant]);
        sendSuccess(res, { msg: 'Folder moved successfully' }, 200);

    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error moving folder', error: e.message }, 500);
    }
};

module.exports = { createFolder, getAllFolders, assignFoldersToRole, getAllAssignedFolders, deleteFolder,moveFolder };

