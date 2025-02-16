const Joi = require('joi');

const postSchema = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    content: Joi.string()
        .min(10)
        .max(200)
        .required(),


});

module.exports = postSchema;

