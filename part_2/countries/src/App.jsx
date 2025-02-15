import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryForm from './components/CountryForm'
import Display from './components/Display'

const App = () => {
    const [countries, setCountry] = useState([])
    const [filteredCountries, setFilteredCountries] = useState(countries)
    const [countrySearch, setCountrySearch] = useState('')

    useEffect(() => {
	countryService
	    .getAllCountries()
	    .then(initialCountries => {
		setCountry(initialCountries)
	    })
    }, [])
    
    const handleFormChangeCountry = (event) => {
	const filterValue = event.target.value
	setCountrySearch(filterValue)

	const filteredItems = countries.filter((c) =>
	    c.name.common.toLowerCase().includes(filterValue.toLowerCase())
	)
	setFilteredCountries(filteredItems)
    }
    
    return(
	<div>
	    <CountryForm countrySearch={countrySearch} handleFormChangeCountry={handleFormChangeCountry} />
	    <Display filteredCountries={filteredCountries} />
	</div>
    )
}

export default App
