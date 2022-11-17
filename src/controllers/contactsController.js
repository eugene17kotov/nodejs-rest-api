const {
    getContacts,
    getContactById,
    createContact,
    updateContactById,
    toggleFavoriteById,
    deleteContactById,
} = require('../services/contactsService');

const getContactsController = async (req, res) => {
    const { _id: userId } = req.user;

    const contacts = await getContacts(userId);

    res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
    const { _id: userId } = req.user;

    const contact = await getContactById(req.params.contactId, userId);

    res.status(200).json(contact);
};

const createContactController = async (req, res) => {
    const { _id: userId } = req.user;

    const createdContact = await createContact(req.body, userId);

    res.status(201).json(createdContact);
};

const updateContactByIdController = async (req, res) => {
    const { _id: userId } = req.user;

    const updatedContact = await updateContactById(
        req.params.contactId,
        req.body,
        userId
    );

    res.status(200).json(updatedContact);
};

const toggleFavoriteByIdController = async (req, res) => {
    const { _id: userId } = req.user;

    const updatedContact = await toggleFavoriteById(
        req.params.contactId,
        req.body,
        userId
    );

    res.status(200).json(updatedContact);
};

const deleteContactByIdController = async (req, res) => {
    await deleteContactById(req.params.contactId, userId);

    res.status(200).json({ message: 'Contact deleted' });
};

module.exports = {
    getContactsController,
    getContactByIdController,
    createContactController,
    updateContactByIdController,
    toggleFavoriteByIdController,
    deleteContactByIdController,
};
