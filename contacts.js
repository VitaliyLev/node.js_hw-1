const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.resolve(__dirname, "./db/contacts.json");

const getAllContact = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const result = await JSON.parse(data);
  return result;
};

async function listContacts() {
  try {
    const result = await getAllContact();
    console.table(result);
    return result;
  } catch (error) {
    return error;
  }
}

async function getContactById(contactId) {
  try {
    const data = await getAllContact();
    const userContact = await data.find(
      (item) => item.id === String(contactId)
    );
    console.log(userContact);
    return userContact || null;
  } catch (error) {
    return error;
  }
}

async function removeContact(contactId) {
  try {
    const data = await getAllContact();
    const deleteContact = await data.find(
      (contact) => contact.id === String(contactId)
    );

    if (deleteContact) {
      const allData = data.filter(
        (contact) => Number(contact.id) !== Number(contactId)
      );
      await fs.writeFile(
        contactsPath,
        JSON.stringify(allData, null, 2),
        "utf-8"
      );
        console.log(deleteContact);
      return allData;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
}

async function addContact(name, email, phone) {
  const newContactUser = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  try {
    const data = await getAllContact();
    data.push(newContactUser);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    console.log(newContactUser);
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
