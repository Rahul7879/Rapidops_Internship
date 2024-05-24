const Joi = require('joi');

class Role {
    constructor({ isReadable, isWritable, isDeletable, isEditable, roleName }) {
        this.isReadable = isReadable;
        this.isWritable = isWritable;
        this.isDeletable = isDeletable;
        this.isEditable = isEditable;
        this.roleName = roleName;
        this.permissions = `${isReadable ? '1' : '0'}${isWritable ? '1' : '0'}${isDeletable ? '1' : '0'}${isEditable ? '1' : '0'}`;
    }

    static validate(roleDetails) {
        const roleSchema = Joi.object({
            isReadable: Joi.boolean().required(),
            isWritable: Joi.boolean().required(),
            isDeletable: Joi.boolean().required(),
            isEditable: Joi.boolean().required(),
            roleName: Joi.string().min(3).max(30).required()
        });

        const { error, value } = roleSchema.validate(roleDetails);
        if (error) {
            throw { status: 400, msg: error.details[0].message };
        }

        return new Role(value);
    }
}

module.exports = Role;
