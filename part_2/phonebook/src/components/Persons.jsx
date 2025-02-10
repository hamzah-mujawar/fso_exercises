const Persons = ( { newFilter, persons, filteredUsers }) => (
    <ul>
	{
	    newFilter === ""
		? persons.map( (person) => (
		    <li key={person.name}>
			{person.name} {' '} {person.number}
		    </li>
		))
		: filteredUsers.map( (person) => (
		    <li key={person.name}>
			{person.name} {' '} {person.number}
		    </li>
		))
	}
    </ul>
)

export default Persons
