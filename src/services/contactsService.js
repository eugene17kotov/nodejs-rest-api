const Contact = require('../models/contact');

const getContacts = async userId => {
    return await Contact.find({ userId });
};

const getContactById = async (contactId, userId) => {
    const contact = await Contact.findOne({ _id: contactId, userId }).catch(
        () => {
            return null;
        }
    );

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
    ).catch(() => {
        return null;
    });

    return updatedContact;
};

const toggleFavoriteById = async (contactId, body, userId) => {
    const updatedContact = await Contact.findOneAndUpdate(
        { _id: contactId, userId },
        body,
        {
            new: true,
        }
    ).catch(() => {
        return null;
    });

    return updatedContact;
};

const deleteContactById = async (contactId, userId) => {
    const deletedContact = await Contact.findOneAndRemove({
        _id: contactId,
        userId,
    }).catch(() => {
        return null;
    });

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
