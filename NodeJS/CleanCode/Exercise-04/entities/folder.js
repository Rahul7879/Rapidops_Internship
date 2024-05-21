const Joi = require('joi');

class Folder {
    constructor({ folderName, parentFolder }) {
        this.folderName = folderName;
        this.parentFolder = parentFolder;
    }

    static validate(folderDetails) {
        const folderSchema = Joi.object({
            folderName: Joi.string().min(1).max(100).required(),
            parentFolder: Joi.number().integer().allow(null).optional()
        });

        const { error, value } = folderSchema.validate(folderDetails);
        if (error) {
            throw { status: 400, msg: error.details[0].message };
        }

        return new Folder(value);
    }
}

module.exports = Folder;
