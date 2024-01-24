const Joi = require('joi');

const userSchema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(30)
        .required(),
    lastName: Joi.string()
        .min(2)
        .max(30)
        .required(),
    age: Joi.number()
        .integer()
        .required(),
    city: Joi.string()
        .min(1)
        .max(30)
});

const idSchema = Joi.object({
    id: Joi.number()
        .integer()
        .required()
});

const putSchema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(30),
    lastName: Joi.string()
        .min(2)
        .max(30),
    age: Joi.number()
        .integer(),
    city: Joi.string()
        .min(1)
        .max(30)
})

module.exports = { userSchema, idSchema, putSchema }