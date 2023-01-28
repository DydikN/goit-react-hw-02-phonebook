import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import styles from './app.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleFormSubmit = ({ name, number }) => {
    const id = nanoid();
    const contact = {
      id,
      name,
      number,
    };

    if (
      this.state.contacts.find(item => {
        return (
          item.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
        );
      })
    ) {
      return alert(`${contact.name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filterContact = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleFormSubmit} />

        <div>
          <h2>Constacts</h2>
          <Filter filter={this.changeFilter} />
          <ContactList
            filter={filterContact}
            deleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
