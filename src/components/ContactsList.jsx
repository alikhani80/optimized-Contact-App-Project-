// components/ContactsList.jsx
import React, { useContext } from "react";
import ContactItem from "./ContactItem";
import styles from "./ContactsList.module.css";
import ContactsContext from "./ContactsContext";

function ContactsList({ contacts, editHandler }) {
  const { dispatch } = useContext(ContactsContext);
  const [selectedContacts, setSelectedContacts] = React.useState(new Set());

  const handleSelect = (id) => {
    setSelectedContacts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleBulkDelete = () => {
    selectedContacts.forEach((id) => {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    });
    setSelectedContacts(new Set());
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Contact List</h3>
        <button
          className={styles.deleteSelected}
          onClick={handleBulkDelete}
          disabled={selectedContacts.size === 0}
        >
          Delete selected contacts
        </button>
      </div>
      {contacts.length ? (
        <ul className={styles.contacts}>
          {contacts.map((contact) => (
            <li key={contact.id} className={styles.contactItem}>
              <input
                type="checkbox"
                checked={selectedContacts.has(contact.id)}
                onChange={() => handleSelect(contact.id)}
              />
              <ContactItem
                data={contact}
                deleteHandler={() => dispatch({ type: "DELETE_CONTACT", payload: contact.id })}
                editHandler={() => {
                  editHandler(contact.id); 
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.message}>No Contacts Yet</p>
      )}
    </div>
  );
}

export default ContactsList;
