import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonalForm from './components/PersonalForm'
import Persons from './components/Persons'
import Phonebook from './services/phonebook'

const App = () => {
  // Initial App's databse of the names and phone numbers
  const [ persons, setPersons ] = useState ([])

  /* A Promise is an object representing the eventual completion or failure of 
   * an asynchronous operation. The Effect Hook lets you perform side effects in 
   * function components. Data fetching, setting up a subscription, and manually 
   * changing the DOM in React components are all examples of side effects.
   */
  useEffect(() => {
    Phonebook
      .getAll()
      .then(initialLists =>{
        setPersons(initialLists)
      })
  }, [])
  // App's cState declarations and events
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ showAllNames, setShowAllNames ] = useState(true)
  /* The code below indicates which lists of the name the website will show.
   * ShowAllNames is set of all names and FilterNames will show only filtered 
   * names entered by the user, which uses RegExp library and determine if the 
   * character(s) in the form will match the names in the phonebook. If so, the 
   * "showAllNames" is set to False and will display the names that includes 
   * the character(s) in the form. However, the order of the chracters will not
   * matter (combination instead of permutation) and thus will need to be revised 
   * later on to account of this situation
   */
  const nameToShow = showAllNames ? persons : persons.filter(person=>person.name.toLowerCase().includes(filterName.toLowerCase()))

  // Event Handlers
  const handleNewName = ( event ) => setNewName(event.target.value)
  const handleNewNumber = ( event ) => setNewNumber(event.target.value)
  const handleFilterName = ( event ) => {
    let regex = new RegExp(event.target.value, "gi")
    setShowAllNames(!regex.test(persons.map(person=>person.name)))
    setFilterName(event.target.value)
  }

  const toggleDelete = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    const nameID = persons.find(p=> p.id === id)
    axios.delete(url, nameID)
    axios.get(url).then(response=>{
      setPersons(response.data)
    })
  }
  // Controller for Adding new person into the phonebook
  const addPerson = ( event ) => {
    event.preventDefault()
    const personObject = {
      name : newName,
      number : newNumber,
    }
    if ( persons.some(person => person.name === newName)){
      window.alert( newName + " is already added to phonebook.")
      setNewName('')
      setNewNumber('')
    } else {
      Phonebook
        .create(personObject)
        .then(newPerson =>{
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  //console.log(nameToShow.map(name=>name.id))
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={filterName} eventHandler={handleFilterName}/>
      <h2>add a new</h2>
      <PersonalForm submitEvent={addPerson} nameValue={newName} nameChange={handleNewName} numberValue={newNumber} numberChange={handleNewNumber} />
      <h2>Numbers</h2>
      {nameToShow.map((person, i)=>
        <Persons key={i} phonebook={person} deletePerson={()=>toggleDelete(person.id)}/>
      )}
    </div>
  )
}

export default App