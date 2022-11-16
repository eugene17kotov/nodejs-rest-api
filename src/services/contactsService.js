const Contact = require('../models/contact');

const getContacts = async () => {
    return await Contact.find({});
};

const getContactById = async contactId => {
    const contact = await Contact.findById(contactId);

    if (!contact) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
    }

    return contact;
};

const createContact = async ({ name, email, phone, favorite = false }) => {
    return await Contact.create({ name, email, phone, favorite });
};

const updateContactById = async (contactId, body) => {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
        new: true,
    });

    if (!updatedContact) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
    }

    return updatedContact;
};

const toggleFavoriteById = async (contactId, body) => {
    if (!body.favorite && !body.favorite === false) {
        const error = new Error('Missing field favorite');
        error.status = 400;
        throw error;
    }

    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
        new: true,
    });

    if (!updatedContact) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
    }

    return updatedContact;
};

const deleteContactById = async contactId => {
    const deletedContact = await Contact.findByIdAndRemove(contactId);

    if (!deletedContact) {
        const error = new Error(`Not found`);
        error.status(404);
        throw error;
    }

    return deletedContact;
};

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContactById,
    toggleFavoriteById,
    deleteContactById,
};
