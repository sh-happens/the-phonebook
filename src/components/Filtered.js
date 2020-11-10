import React from 'react'

const Filtered = ({ filteredName, setFilteredName }) => {
  const filteredPerson = e => {
    setFilteredName(e.target.value)
  }

  return (
    <div>
      filter shown with <input value={filteredName} onChange={filteredPerson} />
    </div>
  )
}

export default Filtered
