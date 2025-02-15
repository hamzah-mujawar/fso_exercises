const Persons = ( { persons, deletePerson }) => (
    <li>
	{persons.name} {persons.number}
	<button onClick={deletePerson}>delete</button>
    </li>
)

export default Persons
