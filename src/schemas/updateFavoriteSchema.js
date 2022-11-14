const Joi = require('joi');

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
}).min(1);

module.exports = { updateFavoriteSchema };
