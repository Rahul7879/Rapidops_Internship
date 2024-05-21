const createOrganizationForUser = require('../../usecases/organization/index.js');
const { sendSuccess, sendError } = require('../../utilities/response.js');

const createOrganizationController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { organizationName } = req.body;
        await createOrganizationForUser(userId, organizationName);
        console.log("hello")
        sendSuccess(res, { msg: 'Organization created successfully' }, 201);
    } catch (error) {
        sendError(res, { msg: error.msg, error: error.error }, error.status || 500);
    }
};

module.exports = createOrganizationController;
