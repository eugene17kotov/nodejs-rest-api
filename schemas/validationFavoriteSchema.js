const Joi = require('joi');

const validationFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required,
});

module.exports = validationFavoriteSchema;
