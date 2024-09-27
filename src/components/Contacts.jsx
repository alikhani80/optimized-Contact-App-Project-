import React, { useContext, useState } from "react";
import ContactsList from "./ContactsList";
import inputs from "../Constants/inputs";
import styles from "./Contacts.module.css";
import ContactsContext from "./ContactsContext";

function Contacts() {
  const { state, dispatch, setAlert } = useContext(ContactsContext);
  const [contact, setContact] = useState({ id: "", name: "", lastName: "", email: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{11}$/;

  const saveHandler = () => {
    if (!contact.name || !contact.lastName || !contact.email || !contact.phone) {
      setAlert("Please fill in all fields.");
      return;
    }
    if (!emailRegex.test(contact.email)) {
      setAlert("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(contact.phone)) {
      setAlert("Please enter a valid phone number (11 digits).");
      return;
    }

    setAlert(""); 
    if (isEditing) {
      dispatch({ type: 'EDIT_CONTACT', payload: contact });
      setAlert("Contact updated successfully.");
      setIsEditing(false);
    } else {
      dispatch({ type: 'ADD_CONTACT', payload: contact });
      setAlert("Contact added successfully.");
    }
    setContact({ name: "", lastName: "", email: "", phone: "" }); 
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const editHandler = (id) => {
    const contactToEdit = state.contacts.find(contact => contact.id === id);
    setContact(contactToEdit);
    setIsEditing(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredContacts = state.contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm) ||
    contact.lastName.toLowerCase().includes(searchTerm) ||
    contact.email.toLowerCase().includes(searchTerm)
  );

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {inputs.map((input, index) => (
          <input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={contact[input.name]}
            onChange={changeHandler}
          />
        ))}
        <button onClick={saveHandler}>{isEditing ? "Save Changes" : "Add Contact"}</button>
        {isEditing && <button onClick={() => setIsEditing(false)}>BACK</button>}
      </div>
      <input 
        type="text" 
        placeholder="Search contact" 
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      <div className={styles.alert}>{state.alert && <p>{state.alert}</p>}</div>
      <ContactsList 
        contacts={filteredContacts} 
        deleteHandler={(id) => dispatch({ type: 'DELETE_CONTACT', payload: id })} 
        editHandler={editHandler} 
      />
    </div>
  );
}

export default Contacts;
