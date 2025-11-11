import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Success from './components/Success'
import Fail from './components/Fail'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filteredUsers, setFilteredUsers] = useState(persons)
	const [newFilter, setNewFilter] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const [failMessage, setFailMessage] = useState('')

	useEffect(() => {
		personService
			.getPersons()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

	const handleFormChangeName = (event) => {
		setNewName(event.target.value)
	}

	const handleFormChangeNumber = (event) => {
		setNewNumber(event.target.value)
	}

	const handleSuccessNotification = (message) => {
		setSuccessMessage(message)
		setTimeout(() => {
			setSuccessMessage(null)
		}, 5000)
	}

	const handleFailNotification = (message) => {
		setFailMessage(message)
		setTimeout(() => {
			setFailMessage(null)
		}, 5000)
	}

	const handleFormChangeFilter = (event) => {
		const filterValue = event.target.value;
		setNewFilter(filterValue);

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
		}
		const personExists = persons.find(p => p.name === newName.trim())
		if (!personExists) {
			persons.find((person) => person.name === newName)
				? alert(`${newName} is already added to phonebook`)
				: personService
					.create(personObject)
					.then(returnedPersons => {
						handleSuccessNotification(
							`Person '${newName}' has been created successfully`
						)
						setPersons(persons.concat(returnedPersons))
						setNewName('')
						setNewNumber('')
					})
					.catch(error => {
						handleFailNotification(error.response.data.error)
					})
		}
		else {
			(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
				?
				personService
					.update(personExists.id, personObject)
					.then(returnedPerson => {
						handleSuccessNotification(
							`'${personExists.name}' phone number successfully updated`
						)
						setPersons(persons.map(n => n.id === personExists.id ? returnedPerson : n))
					})
					.catch(error => {
						handleFailNotification(
							`Information of '${personExists.name} has already been removed from the server`
						)
					})
				: null
		}
	}

	const personsToShow = (newFilter === '')
		? persons
		: filteredUsers

	const deletePerson = (id) => {
		const who = persons.find((person) => person.id === id)
		window.confirm(`Delete ${who.name}?`)
			?
			personService
				.deleteRequest(id)
				.then(returnedPersons => {
					handleSuccessNotification(
						`'${who.name}' was deleted from the phonebook successfully`
					)
					setPersons(persons.filter(p => p.id !== id)
					)
				}
				)
			: null
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Success message={successMessage} />
			<Fail message={failMessage} />
			<Filter newFilter={newFilter} handleFormChangeFilter={handleFormChangeFilter} />
			<PersonForm newName={newName} handleFormChangeName={handleFormChangeName} newNumber={newNumber} handleFormChangeNumber={handleFormChangeNumber} addPerson={addPerson} />
			<h2>Numbers</h2>
			{personsToShow.map(person =>
				<Persons key={person.id} persons={person} deletePerson={() => deletePerson(person.id)} />
			)}
		</div>
	)
}

export default App
