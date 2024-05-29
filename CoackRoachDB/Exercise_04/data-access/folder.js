const pool = require('../db/conn');

async function checkParentFolderExists(parentFolder, tenantId) {
    try {
        const query = 'SELECT 1 FROM folders WHERE folder_id = $1 AND tenant_id = $2';
        const { rows: [result] } = await pool.query(query, [parentFolder, tenantId]);
        return result ? true : false;
    } catch (error) {
        console.error('Error checking parent folder existence:', error.message);
        throw error;
    }
}

async function insertFolder(tenantId, parentFolder, folderName) {
    try {
        const query = 'INSERT INTO folders (tenant_id, parent_folder_id, folder_name) VALUES ($1, $2, $3)';
        await pool.query(query, [tenantId, parentFolder || null, folderName]);
    } catch (error) {
        console.error('Error inserting folder:', error.message);
        throw error;
    }
}

async function deleteFolder(folderId, tenantId) {
    try {
        const query = 'DELETE FROM folders WHERE folder_id = $1 AND tenant_id = $2';
        await pool.query(query, [folderId, tenantId]);
    } catch (error) {
        console.error('Error deleting folder:', error.message);
        throw error;
    }
}

async function checkFolderAccess(folderId, roleId, tenantId) {
    try {
        const query = `
            SELECT 1 
            FROM roles r 
            JOIN JSON_TABLE(r.folders, '$[*]' COLUMNS(folders_id INT PATH '$')) jt 
            ON jt.folders_id = $1 
            WHERE r.role_id = $2 AND r.tenant_id = $3`;
        const { rows: [result] } = await pool.query(query, [folderId, roleId, tenantId]);
        return result ? true : false;
    } catch (error) {
        console.error('Error checking folder access:', error.message);
        throw error;
    }
}

async function updateFolderParent(newParentFolder, folderId, tenantId) {
    try {
        const query = 'UPDATE folders SET parent_folder_id = $1 WHERE folder_id = $2 AND tenant_id = $3';
        await pool.query(query, [newParentFolder, folderId, tenantId]);
    } catch (error) {
        console.error('Error updating folder parent:', error.message);
        throw error;
    }
}

async function assignFoldersToRole(folders, roleId, tenantId) {
    try {
        const query = 'UPDATE roles SET folders = $1 WHERE role_id = $2 AND tenant_id = $3';
        await pool.query(query, [JSON.stringify(folders), roleId, tenantId]);
    } catch (error) {
        console.error('Error assigning folders to role:', error.message);
        throw error;
    }
}

async function getAssignedFolders(roleId, tenantId) {
    try {
        const query = 'SELECT folders FROM roles WHERE role_id = $1 AND tenant_id = $2';
        const { rows: [result] } = await pool.query(query, [roleId, tenantId]);
        return result ? result.folders : null;
    } catch (error) {
        console.error('Error getting assigned folders:', error.message);
        throw error;
    }
}

async function getAllFolders(tenantId) {
    try {
        const query = 'SELECT folder_id FROM folders WHERE tenant_id = $1';
        const { rows: result } = await pool.query(query, [tenantId]);
        return result.length > 0 ? result.map(row => row.folder_id) : null;
    } catch (error) {
        console.error('Error getting all folders:', error.message);
        throw error;
    }
}

async function getFoldersByParentId(parentFolderId, limit, offset) {
    try {
        const query = 'SELECT * FROM folders WHERE parent_folder_id = $1 LIMIT $2 OFFSET $3';
        const { rows: result } = await pool.query(query, [parentFolderId, limit, offset]);
        return result;
    } catch (error) {
        console.error('Error getting folders by parent ID:', error.message);
        throw error;
    }
}

async function getFilesByFolderId(folderId, limit, offset) {
    try {
        const query = 'SELECT * FROM files WHERE folder_id = $1 LIMIT $2 OFFSET $3';
        const { rows: result } = await pool.query(query, [folderId, limit, offset]);
        return result;
    } catch (error) {
        console.error('Error getting files by folder ID:', error.message);
        throw error;
    }
}

async function countFoldersByParentId(parentFolderId) {
    try {
        const query = 'SELECT COUNT(*) AS count FROM folders WHERE parent_folder_id = $1';
        const { rows: [result] } = await pool.query(query, [parentFolderId]);
        return result.count;
    } catch (error) {
        console.error('Error counting folders by parent ID:', error.message);
        throw error;
    }
}

async function countFilesByFolderId(folderId) {
    try {
    const query = 'SELECT COUNT(*) AS count FROM files WHERE folder_id = $1';
    const { rows: [result] } = await pool.query(query, [folderId]);
    return result.count;
    } catch (error) {
    console.error('Error counting files by folder ID:', error.message);
    throw error;
    }
    }
    
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
