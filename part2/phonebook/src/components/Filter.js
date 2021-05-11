import React from 'react'

const Filter = ({name, eventHandler}) => {
  return (
    <form>
      <div>filter shown with<input value={name} onChange={eventHandler}/></div>
    </form>
  )
}

export default Filter