const Joi = require('joi')

const registerSchema = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .min(3)
        .max(30)
        .pattern(new RegExp('^[a-zA-Z0-9]+$'))
        .required(),
    email: Joi.string()
        .min(3)
        .max(30)
        .email()
        .required()
});

module.exports = registerSchema;

