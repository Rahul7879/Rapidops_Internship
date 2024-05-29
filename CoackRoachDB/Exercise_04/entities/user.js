const Joi = require('joi');

class User {
    constructor({ email, password, fullName }) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
    }

    static validate(userDetails) {
        const userSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            fullName: Joi.string().pattern(/^[a-zA-Z\s]+$/).required()
        });

        const { error, value } = userSchema.validate(userDetails);
        if (error) {
            throw { status: 400, msg: error.details[0].message };
        }

        return new User(value);
    }
}

module.exports = User;
