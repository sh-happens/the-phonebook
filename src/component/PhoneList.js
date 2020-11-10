import React from "react";

const PhoneList = ({ persons, showFilter, removeEntry }) => {
  let filterUppercase = showFilter.toUpperCase();
  let newPersonArray = persons.filter((person) => {
    let personInUppercase = person.name.toUpperCase();
    return personInUppercase.includes(filterUppercase);
  });

  return newPersonArray.map((person) => (
    <li key={person.name}>
      {person.name} : {person.number}
      <button onClick={() => removeEntry(person)}>Delete</button>
    </li>
  ));
};

export default PhoneList;
