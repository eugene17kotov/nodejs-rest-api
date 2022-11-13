const express = require('express');
const Joi = require('joi');

const router = express.Router();

const contactsOperations = require('../../models/contacts');

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
    try {
        const contacts = await contactsOperations.listContacts();

        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
});

router.get('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contactsOperations.getContactById(contactId);

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

router.post('/', async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);

        if (error) {
            error.status = 400;
            error.message = `missing required ${error.details[0].context.label} field`;
            throw error;
        }

        const createdContact = await contactsOperations.addContact(req.body);

        res.status(201).json(createdContact);
    } catch (error) {
        next(error);
    }
});

router.delete('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;

        const deletedContact = await contactsOperations.removeContact(
            contactId
        );

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

router.put('/:contactId', async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            error.status(400);
            error.message = 'Missing fields';
            throw error;
        }

        const { contactId } = req.params;

        const updatedContact = await contactsOperations.updateContact(
            contactId,
            req.body
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
});

module.exports = router;
