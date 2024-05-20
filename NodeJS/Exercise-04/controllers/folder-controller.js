const { sendSuccess, sendError } = require('../utilities/response.js');
const pool = require('../db/conn.js');

const checkPermission = (permissions, actionIndex, isAdmin) => {
    console.log(permissions, actionIndex, isAdmin)
    if (isAdmin) return true; // Admins have all permissions
    return permissions[actionIndex] === '1';
};



const createFolder = async (req, res) => {
    try {
        const { folderName, parentFolder } = req.body;
        if (!folderName) {
            return sendError(res, { msg: 'Folder name is required' }, 400);
        }

        const { tenantId, permissions } = req.user;

        if (!checkPermission(permissions, 1, false)) { // 1 indicates the "create" permission
            return sendError(res, { msg: 'Insufficient permissions To Create Folder' }, 403);
        }

        if (parentFolder) {
            const parentCheckQuery = 'SELECT 1 FROM folders WHERE folder_id = ? AND tenant_id = ?';
            const [parentExists] = await pool.query(parentCheckQuery, [parentFolder, tenantId]);
            if (!parentExists.length) {
                return sendError(res, { msg: 'Invalid parent folder ID' }, 400);
            }
        }

        const insertFolderQuery = 'INSERT INTO folders (tenant_id, parent_folder_id, folder_name) VALUES (?, ?, ?)';
        await pool.query(insertFolderQuery, [tenantId, parentFolder || null, folderName]);
        sendSuccess(res, { msg: 'Folder created successfully' }, 201);

    } catch (e) {
        console.error(e);
        sendError(res, { msg: e.message, error: e.message }, 500);
    }
};

const deleteFolder = async (req, res) => {
    try {
        const folderId = +req.params.folderId;
        const { tenantId, permissions, isAdmin, roleId } = req.user;

        if (!folderId) {
            return sendError(res, { msg: 'Folder ID is required' }, 400);
        }

        if (!checkPermission(permissions, 2, isAdmin)) { // 2 indicates the "delete" permission
            return sendError(res, { msg: 'Insufficient permissions' }, 403);
        }

        if (!isAdmin) {
            // Check if the user has access to the folder
            const checkFolderQuery = `
                SELECT 1 
                FROM roles r 
                JOIN JSON_TABLE(r.folders, '$[*]' COLUMNS(folders_id INT PATH '$')) jt 
                ON jt.folders_id = ? 
                WHERE r.role_id = ? AND r.tenant_id = ?`;
            const [folderAccess] = await pool.query(checkFolderQuery, [folderId, roleId, tenantId]);
            if (!folderAccess.length) {
                return sendError(res, { msg: 'You do not have permission to delete this folder' }, 403);
            }
        }

        const deleteFolderQuery = 'DELETE FROM folders WHERE folder_id = ? AND tenant_id = ?';
        await pool.query(deleteFolderQuery, [folderId, tenantId]);
        sendSuccess(res, { msg: 'Folder and all contents deleted successfully' }, 200);

    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error deleting folder', error: e.message }, 500);
    }
};

const moveFolder = async (req, res) => {
    try {
        const { newParentFolder } = req.body;
        const folderId = +req.params.folderId;
        const { tenantId, permissions, isAdmin, roleId } = req.user;

        if (!folderId || !newParentFolder) {
            return sendError(res, { msg: 'Folder ID and new parent folder ID are required' }, 400);
        }

        if (!checkPermission(permissions, 3, isAdmin)) { // 3 indicates the "update" permission
            return sendError(res, { msg: 'Insufficient permissions' }, 403);
        }

        if (!isAdmin) {
            // Check if the user has access to the folder
            const checkFolderQuery = `
                SELECT 1 
                FROM roles r 
                JOIN JSON_TABLE(r.folders, '$[*]' COLUMNS(folders_id INT PATH '$')) jt 
                ON jt.folders_id = ? 
                WHERE r.role_id = ? AND r.tenant_id = ?`;
            const [folderAccess] = await pool.query(checkFolderQuery, [folderId, roleId, tenantId]);
            if (!folderAccess.length) {
                return sendError(res, { msg: 'You do not have permission to move this folder' }, 403);
            }
        }

        const moveFolderQuery = 'UPDATE folders SET parent_folder_id = ? WHERE folder_id = ? AND tenant_id = ?';
        await pool.query(moveFolderQuery, [newParentFolder, folderId, tenantId]);
        sendSuccess(res, { msg: 'Folder moved successfully' }, 200);

    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error moving folder', error: e.message }, 500);
    }
};

const assignFoldersToRole = async (req, res) => {
    try {
        const { folders } = req.body;
        const roleId = req.params.roleId;
        const { isAdmin, tenantId } = req.user;
        console.log(req.user, "_________", folders, roleId)

        if (!isAdmin) {
            return sendError(res, { msg: 'Insufficient permissions to assign folders to roles' }, 403);
        }

        const assignFoldersQuery = 'UPDATE roles SET folders = ? WHERE role_id = ? AND tenant_id = ?';
        await pool.query(assignFoldersQuery, [JSON.stringify(folders), roleId, tenantId]);
        sendSuccess(res, { msg: 'Folders assigned to role successfully' }, 200);

    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error assigning folders to role', error: e.message }, 500);
    }
};

const safelyParseJSON = (json) => {
    try {
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
};

const getAllAssignedFolders = async (req, res) => {
    try {
        const { isAdmin, roleId, tenantId } = req.user;


        // Check if the user is an admin or if they have a valid role ID
        if (!isAdmin && !roleId) {
            return sendError(res, { msg: 'Insufficient permissions to view assigned folders for this role' }, 403);
        }

        const getAssignedFoldersQuery = 'SELECT folders FROM roles WHERE role_id = ? AND tenant_id = ?';
        const [results] = await pool.query(getAssignedFoldersQuery, [roleId, tenantId]);

        if (results.length === 0) {
            return sendError(res, { msg: 'No assigned folders found for this role' }, 404);
        }

        const assignedFolders = JSON.stringify(results[0].folders);
        console.log(results[0].folders, assignedFolders)
        sendSuccess(res, { assignedFolders }, 200);

    } catch (e) {
        console.error(e);
        sendError(res, { msg: 'Error getting assigned folders', error: e.message }, 500);
    }
};

module.exports = { createFolder, deleteFolder, moveFolder, assignFoldersToRole, getAllAssignedFolders }

