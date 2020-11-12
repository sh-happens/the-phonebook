import React, { useState, useEffect } from "react";
import PhoneList from "./component/PhoneList";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showFilter, setShowfilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        showMessage("Could not restrieve data", false);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((e) => e.name === newName)) {
      let personId = persons.find((item) => item.name === newName);

      let updatedEntry = Object.assign(personId, personObject);

      if (
        window.confirm(
          `Do you want to update ${newName} with new ${newNumber}?`
        )
      ) {
        personService
          .update(personId.id, personObject)
          .then(() => {
            setPersons(
              persons.map((item) =>
                item.name === newName ? updatedEntry : item
              )
            );
            setNewNumber("");
            showMessage(`User ${newName} phone number updated`);
          })
          .catch((error) => {
            showMessage(
              `Update failed. User ${newName} has already been removed from the phone book.`,
              false
            );
            setPersons(persons.filter((n) => n.name !== newName));
          });
      }
    } else {
      if (persons.some((e) => e.number === newNumber)) {
        return alert(`# ${newNumber} is already in the phone book.`, false);
      } else {
        if (newName === "" || newNumber === "") {
          return alert(`The name and number must not be empty`, false);
        } else {
          personService
            .create(personObject)
            .then((returnedPerson) => {
              setPersons(persons.concat(returnedPerson));
              setNewName("");
              setNewNumber("");
              showMessage(`User ${newName} has been added to the phone book`);
            })
            .catch((error) => {
              console.log(error.response.data.error);
              return showMessage(
                `Failed to add number. More about error: ${error.response.data.error}`,
                false
              );
            });
          personService
            .getAll()
            .then((response) => {
              setPersons(response);
            })
            .catch((error) => showMessage("Could not retrieve data", false));
        }
      }
    }

    personService.create(personObject).then((response) => {
      setPersons(persons.concat(response));
      setNewName("");
      setNewNumber("");
    });
  };

  const removeEntry = (person) => {
    if (window.confirm(`Remove ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((item) => item.id !== person.id));
          showMessage(`${person.name} has been removed from the phone book`);
        })
        .catch((error) => {
          showMessage(
            `Remove failed. User ${person.name} has already been removed from the phone book.`,
            false
          );
          personService
            .getAll()
            .then((response) => {
              setPersons(response);
            })
            .catch((error) => showMessage("Could not retrieve data", false));
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const showMessage = (message, successNotification = true) => {
    setNotification(message);
    setSuccess(successNotification);

    setTimeout(() => {
      setNotification(null);
      setSuccess(null);
    }, 8000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showFilter={showFilter} setShowFilter={setShowfilter} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        <PhoneList
          persons={persons}
          showFilter={showFilter}
          removeEntry={removeEntry}
        />
      </ul>
    </div>
  );
};

export default App;
