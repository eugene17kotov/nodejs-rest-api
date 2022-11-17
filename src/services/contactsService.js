const Contact = require('../models/contact');

const getContacts = async userId => {
    return await Contact.find({ userId });
};

const getContactById = async (contactId, userId) => {
    const contact = await Contact.findOne({ _id: contactId, userId });

    if (!contact) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
    }

    return contact;
};

const createContact = async (
    { name, email, phone, favorite = false },
    userId
) => {
    return await Contact.create({ userId, name, email, phone, favorite });
};

const updateContactById = async (contactId, body, userId) => {
    const updatedContact = await Contact.findOneAndUpdate(
        { _id: contactId, userId },
        body,
        { new: true }
    );

    if (!updatedContact) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
    }

    return updatedContact;
};

const toggleFavoriteById = async (contactId, body, userId) => {
    if (!body.favorite && !body.favorite === false) {
        const error = new Error('Missing field favorite');
        error.status = 400;
        throw error;
    }

    const updatedContact = await Contact.findOneAndUpdate(
        { _id: contactId, userId },
        body,
        {
            new: true,
        }
    );

    if (!updatedContact) {
        const error = new Error('Not found');
        error.status = 404;
        throw error;
    }

    return updatedContact;
};

const deleteContactById = async (contactId, userId) => {
    const deletedContact = await Contact.findOneAndRemove({
        _id: contactId,
        userId,
    });

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
