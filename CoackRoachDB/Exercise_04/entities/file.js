const Joi = require('joi');
const path = require('path');

class File {
    constructor({ folderId, originalFilename, filepath, newFilename, newPath }) {
        this.folderId = folderId;
        this.originalFilename = originalFilename;
        this.filepath = filepath;
        this.newFilename = newFilename;
        this.newPath = newPath;
    }

    static validate(fileDetails) {
        const fileSchema = Joi.object({
            folderId: Joi.string().pattern(/^\d+$/).required(), // Validate folderId as a numeric string
            originalFilename: Joi.string().required(),
            filepath: Joi.string().required(),
            newFilename: Joi.string().required(),
            newPath: Joi.string().required()
        });

        const { error, value } = fileSchema.validate(fileDetails);
        if (error) {
            throw { status: 400, msg: error.details[0].message };
        }

        return new File(value);
    }

    static generateNewFilename(originalFilename) {
        return `${Date.now()}-${Math.random().toString(36).substring(7)}${path.extname(originalFilename)}`;
    }
}

module.exports = File;
