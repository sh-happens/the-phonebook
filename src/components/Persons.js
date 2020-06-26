import React from 'react'

const Persons = ({ persons, filteredName }) => {
  const filteredNameUpperCase = filteredName.toUpperCase()
  const personsList = persons.filter(person => {
    let personUpperCase = person.name.toUpperCase()
    return personUpperCase.includes(filteredNameUpperCase)
  })

  return personsList.map(person => (
    <div key={person.number}>
      {person.name} {person.number}
    </div>
  )
  )
}

export default Persons