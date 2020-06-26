import React, { useState, useEffect } from 'react'
import Filtered from './Filtered'
import Persons from './Persons'
import PersonForm from './PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])



  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(x => x.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filtered filteredName={filteredName} setFilteredName={setFilteredName} />
      </div>
      <br />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        <Persons
          persons={persons}
          filteredName={filteredName}
        />
      </div>
    </div>
  )
}

export default App