import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
	{ name: 'Hamzah Mujawar' }
    ])
    const [newName, setNewName] = useState('')

    const handleFormChange = (event) => {
	console.log(event.target.value)
	setNewName(event.target.value)
    }

    const addPerson = (event) => {
	event.preventDefault()
	const personObject = {
	    name: newName,
	    id: newName
	}
	const Dupli = persons.find( (person) => person.name === newName)
	    ? alert(`${newName} is already added to phonebook`)
	    : setPersons(persons.concat(personObject))
 	setNewName('')
    }
    
    return(
	<div>
	    <h2>Phonebook</h2>
	    <form>
		<div>
			 name: <input
				   value={newName}
				   onChange={handleFormChange}
			 />
		</div>
		<div>
		    <button type="submit" onClick={addPerson}>add</button>
		</div>
	    </form>
	    <h2>Numbers</h2>
	    <ul>
		{ persons.map( (person) => (
		    <li key={person.name}>
			{person.name}
		    </li>
		))}
	    </ul>
	    <div>debug: {newName}</div>
	</div>
    )
}

export default App
