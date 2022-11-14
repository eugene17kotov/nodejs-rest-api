const express = require('express');

const router = express.Router();

const Contact = require('../../models/contact');

const { validationBody } = require('../../middlewares/validationBody');
const { updateFavoriteSchema } = require('../../schemas/updateFavoriteSchema');
const { addContactSchema } = require('../../schemas/addContactValidation');
const {
    updateContactSchema,
} = require('../../schemas/updateContactValidation');

router.get('/', async (req, res, next) => {
    try {
        const contacts = await Contact.find({});

        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
});

router.get('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await Contact.findById(contactId);

        if (!contact) {
            const error = new Error('Not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
});

router.post('/', validationBody(addContactSchema), async (req, res, next) => {
    try {
        const createdContact = await Contact.create(req.body);

        res.status(201).json(createdContact);
    } catch (error) {
        next(error);
    }
});

router.delete('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;

        const deletedContact = await Contact.findByIdAndRemove(contactId);

        if (!deletedContact) {
            const error = new Error(`Not found`);
            error.status(404);
            throw error;
        }

        res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
        next(error);
    }
});

router.put(
    '/:contactId',
    validationBody(updateContactSchema),
    async (req, res, next) => {
        try {
            const { contactId } = req.params;

            const updatedContact = await Contact.findByIdAndUpdate(
                contactId,
                req.body,
                { new: true }
            );

            if (!updatedContact) {
                const error = new Error('Not found');
                error.status = 404;
                throw error;
            }

            res.status(200).json(updatedContact);
        } catch (error) {
            next(error);
        }
    }
);

router.patch(
    '/:contactId/favorite',
    validationBody(updateFavoriteSchema),
    async (req, res, next) => {
        try {
            const {
                body,
                params: { contactId },
            } = req;

            if (!body.favorite && !body.favorite === false) {
                const error = new Error('Missing field favorite');
                error.status = 400;
                throw error;
            }

            const updatedContact = await Contact.findByIdAndUpdate(
                contactId,
                body,
                { new: true }
            );

            if (!updatedContact) {
                const error = new Error('Not found');
                error.status = 404;
                throw error;
            }

            res.status(200).json(updatedContact);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
