import React from 'react'

const Persons =({phonebook, deletePerson}) => {
  return (
    <div>
      {phonebook.name} {phonebook.number} <button onClick={deletePerson}>delete</button>
    </div>
  )
}

export default Persons