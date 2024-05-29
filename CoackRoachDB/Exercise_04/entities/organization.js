const Joi = require('joi');

const organizationSchema = Joi.object({
    name: Joi.string().required(),
    adminId: Joi.number().integer().required(),
});

class Organization {
    constructor(name, adminId) {
        this.name = name;
        this.adminId = adminId;
    }

    static validate(data) {
        const { error, value } = organizationSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return new Organization(value.name, value.adminId);
    }
}

module.exports = Organization;
