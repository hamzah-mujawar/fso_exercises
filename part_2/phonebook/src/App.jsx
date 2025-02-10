import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
	{ name: 'Arto Hellas', number: '040-123456', id: 1 },
	{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
	{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
	{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filteredUsers, setFilteredUsers] = useState(persons)
    const [newFilter, setNewFilter] = useState('')
    
    const handleFormChangeName = (event) => {
	setNewName(event.target.value)
    }

    const handleFormChangeNumber = (event) => {
	setNewNumber(event.target.value)
    }

    const handleFormChangeFilter = (event) => {
	const filterValue = event.target.value;
	setNewFilter(filterValue); // Update the state

	const filteredItems = persons.filter((person) =>
            person.name.toLowerCase().includes(filterValue.toLowerCase())
	);
	setFilteredUsers(filteredItems);
    };

    const addPerson = (event) => {
	event.preventDefault()
	const personObject = {
	    name: newName,
	    number: newNumber,
	    id: newName
	}
	persons.find((person) => person.name === newName)
	    ? alert(`${newName} is already added to phonebook`)
	    : setPersons(persons.concat(personObject))
 	setNewName('')
	setNewNumber('')
    }
    
    return(
	<div>
	    <h2>Phonebook</h2>
	    <Filter newFilter={newFilter} handleFormChangeFilter={handleFormChangeFilter} />
	    <PersonForm newName={newName} handleFormChangeName={handleFormChangeName} newNumber={newNumber} handleFormChangeNumber={handleFormChangeName} addPerson={addPerson} />
	    <h2>Numbers</h2>
	    <Persons newFilter={newFilter} persons={persons} filteredUsers={filteredUsers} />
	</div>
    )
}

export default App
