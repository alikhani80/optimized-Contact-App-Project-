import React, { createContext, useReducer, useCallback } from 'react';
import { v4 } from 'uuid';

const ContactsContext = createContext();

const initialState = {
  contacts: [],
  alert: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, { ...action.payload, id: v4() }] };
    case 'EDIT_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case 'DELETE_CONTACT':
      return { ...state, contacts: state.contacts.filter(contact => contact.id !== action.payload) };
    case 'SET_ALERT':
      return { ...state, alert: action.payload };
    case 'CLEAR_ALERT':
      return { ...state, alert: '' };
    default:
      return state;
  }
};

export const ContactsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAlert = useCallback((message, duration = 3000) => {
    dispatch({ type: 'SET_ALERT', payload: message });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_ALERT' });
    }, duration);
  }, []);

  return (
    <ContactsContext.Provider value={{ state, dispatch, setAlert }}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsContext;
