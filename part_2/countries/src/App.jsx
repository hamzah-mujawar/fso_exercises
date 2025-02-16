import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryForm from './components/CountryForm'
import Display from './components/Display'

const App = () => {
    const [countries, setCountry] = useState([])
    const [filteredCountries, setFilteredCountries] = useState(countries)
    const [countrySearch, setCountrySearch] = useState('')
    const [weatherCountry, setWeatherCountry] = useState([])
    
    useEffect(() => {
	countryService
	    .getAllCountries()
	    .then(initialCountries => {
		setCountry(initialCountries)
	    })
    }, [])
    
    useEffect(() => {
	if(filteredCountries.length === 1){
	    const country = filteredCountries[0]
	    if(country.latlng){
		countryService
		    .getWeather(country.latlng[0], country.latlng[1])
		    .then(returnedWeather => {
			setWeatherCountry(returnedWeather)
		    })
	    }
	}
    }, [countrySearch], [filteredCountries])
    
    const handleFormChangeCountry = (event) => {
	const filterValue = event.target.value
	setCountrySearch(filterValue)

	const filteredItems = countries.filter((c) =>
	    c.name.common.toLowerCase().includes(filterValue.toLowerCase())
	)
	setFilteredCountries(filteredItems)
    }

    const handleShowCountry = (country) => {
	setFilteredCountries([country])
    }

    return(
	<div>
	    <CountryForm countrySearch={countrySearch} handleFormChangeCountry={handleFormChangeCountry} />
	    <Display filteredCountries={filteredCountries} handleShowCountry={handleShowCountry} />
	</div>
    )
}

export default App
