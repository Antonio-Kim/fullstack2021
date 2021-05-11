import React from 'react'

const Persons =({phonebook}) => {
  return (
    <div>
      {phonebook.map(person=><div>{person.name} {person.number}</div>)}
    </div>
  )
}

export default Persons