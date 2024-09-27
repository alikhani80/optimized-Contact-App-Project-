// App.jsx
import Header from "./components/Header";
import Contacts from "./components/Contacts";
import { ContactsProvider } from "./components/ContactsContext";

function App() {
  return (
    <ContactsProvider>
      <Header />
      <Contacts />
    </ContactsProvider>
  );
}

export default App;
