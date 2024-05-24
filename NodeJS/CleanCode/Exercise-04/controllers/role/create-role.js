module.exports = function makeCreateRole(roleUseCases, sendSuccess, sendError) {
    return async function createRole(req, res) {
        try {
            await roleUseCases.createRole(req.body, req.user);
            sendSuccess(res, { msg: 'Role created successfully' }, 201);
        } catch (error) {
            console.error('Error creating role:', error);
            sendError(res, { msg: 'Error during role creation', error: error.msg || error.message }, error.status || 500);
        }
    };
};

