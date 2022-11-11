const path = require('path');
const fs = require('fs').promises;
const { v4: uuid } = require('uuid');

const contactsPath = path.join(__dirname, '../models/contacts.json');

async function listContacts() {
    try {
        const contactsData = await fs.readFile(contactsPath, 'utf8');
        const contactsList = JSON.parse(contactsData);

        return contactsList;
    } catch (err) {
        console.error(err);
    }
}

async function getContactById(contactId) {
    try {
        const contactsData = await fs.readFile(contactsPath, 'utf8');
        const contactsList = JSON.parse(contactsData);

        const stringedContactId = contactId.toString();

        const contactById = contactsList.find(
            contact => contact.id === stringedContactId
        );

        return contactById || null;
    } catch (err) {
        console.error(err);
    }
}

async function removeContact(contactId) {
    try {
        const contactsData = await fs.readFile(contactsPath, 'utf8');
        const contactsList = JSON.parse(contactsData);

        const stringedContactId = contactId.toString();

        const indexRemovedContact = contactsList.findIndex(
            contact => contact.id === stringedContactId
        );

        if (indexRemovedContact === -1) {
            return null;
        }

        const [removedContact] = contactsList.splice(indexRemovedContact, 1);

        const stringedContactsList = JSON.stringify(contactsList);

        await fs.writeFile(contactsPath, stringedContactsList, 'utf8');

        return removedContact;
    } catch (err) {
        console.error(err);
    }
}

async function addContact(contactData) {
    try {
        const contactsData = await fs.readFile(contactsPath, 'utf8');
        const contactsList = JSON.parse(contactsData);

        const newContact = { id: uuid(), ...contactData };

        contactsList.push(newContact);

        const stringedContactsList = JSON.stringify(contactsList);

        await fs.writeFile(contactsPath, stringedContactsList, 'utf8');

        return newContact;
    } catch (err) {
        console.error(err);
    }
}

const updateContact = async (contactId, body) => {
    try {
        const contactsData = await fs.readFile(contactsPath, 'utf8');
        const contactsList = JSON.parse(contactsData);

        const stringedContactId = contactId.toString();

        const indexUpdatedContact = contactsList.findIndex(
            contact => contact.id === stringedContactId
        );

        if (indexUpdatedContact === -1) {
            return null;
        }

        const updatedContact = { id: contactId, ...body };

        contactsList.splice(indexUpdatedContact, 1, updatedContact);

        const stringedContactsList = JSON.stringify(contactsList);

        await fs.writeFile(contactsPath, stringedContactsList, 'utf8');

        return updatedContact;
    } catch (error) {
        console.error(err);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
