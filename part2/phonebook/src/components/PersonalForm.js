import React from 'react'

const PersonalForm = ({submitEvent, nameValue, nameChange, numberValue, numberChange}) => {
  return (
    <form onSubmit={submitEvent}>
      <div>name: <input value={nameValue} onChange={nameChange}/></div>
      <div>number: <input value={numberValue} onChange={numberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonalForm